"use client";
import { PageMap, logger, pageMap } from "@shared/util-client";
import { ReactNode, useEffect } from "react";
import { gql, st } from "@shared/data-access";
import { themeChange } from "theme-change";
import { useCookies } from "react-cookie";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
type GqlProviderProps = {
  pageMap: Partial<PageMap>;
  uri?: string;
  ws?: string;
  environment: string;
  init?: () => Promise<void>;
  userInit?: (self: { id: string }, me: gql.Keyring) => Promise<void>;
  children: ReactNode | ReactNode[];
  useSelf: () => { id: string } | null;
  whoAmI: (option?: { reset?: boolean }) => Promise<void>;
};

export const GqlProvider = ({
  children,
  useSelf,
  init,
  environment,
  userInit,
  ...initClientForm
}: GqlProviderProps) => {
  const router = useRouter();
  // const params = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const jwt = searchParams.get("jwt");
  const skipBlocks = searchParams.get("skipBlocks");
  const uiOperation = st.use.uiOperation();
  const self = useSelf();
  const myKeyring = st.use.myKeyring();
  const [cookie, , removeCookie] = useCookies<"accessToken", { accessToken?: { jwt: string } }>(["accessToken"]);
  useEffect(() => {
    themeChange(false);
    logger.setLevel(environment === "main" ? "warn" : "trace");
    pageMap.set(initClientForm.pageMap);
    pageMap.push = router.push;
    pageMap.replace = router.replace;
    if (skipBlocks === "true") initClientForm.pageMap.blockCountries = [];
    (async () => {
      await st.do.initClient({
        ...initClientForm,
        jwt: jwt ?? cookie.accessToken?.jwt,
      });
      init && (await init());
    })();
    const u1 = st.sub((state) => state.me, st.do.checkAuth);
    const u2 = st.sub((state) => state.me, st.do.checkAuth);
    return () => {
      u1();
      u2();
    };
  }, [jwt]);
  useEffect(() => {
    if (!self?.id?.length || !myKeyring.id?.length) return;
    removeCookie("accessToken", { path: "/" });
    userInit && userInit(self, myKeyring);
  }, [self, myKeyring]);
  useEffect(() => {
    st.do.checkAuth();
  }, [pathname, uiOperation]);
  useEffect(() => {
    const handleResize = () => st.do.setWindowSize();
    handleResize();
    window?.addEventListener("resize", handleResize);
    return () => window?.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    pageMap.pathname = pathname;
    // pageMap.params = params;
    pageMap.searchParams = searchParams;
    // }, [searchParams, params, pathname]);
  }, [searchParams, pathname]);
  return <div className="frameRoot">{uiOperation === "idle" && children}</div>;
};
