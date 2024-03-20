import "./styles.css";
import "./styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "suneditor/dist/css/suneditor.min.css";
import { AppProps } from "next/app";
import { DriverLayout, LogoOutlined, MainLayout, UnLoggedInLayout } from "../components";
import { GqlProvider, message } from "@shared/ui-web";
import { NextIntlClientProvider } from "next-intl";
import { client, PageMap } from "@shared/util-client";
import { env } from "../env/env";
import { st } from "../stores";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Head from "next/head";
import { useEffect } from "react";
import { ChatBoard, crystalizeChatBoard } from "libs/social/data-access/src/chatBoard/chatBoard.gql";
import { crystalizeChatRoom, LightChatRoom } from "libs/social/data-access/src/chatRoom/chatRoom.gql";
import useCookies from "react-cookie/cjs/useCookies";
import { AiOutlinePhone } from "react-icons/ai";
import { customStore } from "../stores/store";
import Image from "next/image";

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = usePathname();
  const self = st.use.self();
  const customSt = customStore();
  const chatBoardId = useSearchParams().get("chatBoardId") as string;
  const [cookies, setCookie, removeCookie] = useCookies();
  const chatBoard = st.use.chatBoard();
  useEffect(() => {
    document.addEventListener("message", (e: any) => {
      e?.data && client.setExpoToken(e.data);
    });
    if (client.jwt) {
      // gql.addMobileToken(client.mobileToken);
      setCookie("JWT", `Bearer ${client.jwt}`);
      client.setSocket(env.ws);
    }
    client.socket?.on("newChatBoard", async ({ chatBoard }: { chatBoard: ChatBoard }) => {
      {
        const crystalizedChatBoard = crystalizeChatBoard(chatBoard);
        st.do.receiveChatBoard(crystalizedChatBoard);
        message.info("새로운 채팅방이 생성/허가 되었습니다. 내 채팅방에 들어가 새로고침해주세요");
      }
    });
    client.socket?.on("kicked", () => {
      message.info(" 채팅방에서 퇴장되었습니다. 내 채팅방 들어가 새로고침해주세요");
    });
    client.socket?.on("newChat", ({ chatRoom, boardId }) => {
      const crystalizedChatRoom = crystalizeChatRoom(chatRoom);
      if (chatBoard !== "loading" && chatBoard.id === boardId) {
        if (crystalizedChatRoom.id !== chatBoard.recentRoom.id) {
          st.do.appendChatRoomInChatBoard(chatBoard.recentRoom as LightChatRoom);
          // }
        }
        st.do.receiveRecentRoom(crystalizedChatRoom, boardId);
      }
    });
    client.socket?.on("readChatBoard", ({ chatRoom, boardId }) => {});
    return () => {
      removeCookie("JWT");
      client.socket?.disconnect();
    };
  }, [client.jwt, chatBoard]);

  useEffect(() => {
    st.do.initChatBoard({ query: { _id: { $in: self.chatBoards } } });
  }, [client.jwt]);
  useEffect(() => {
    st.do.initChatBoard({ query: { _id: { $in: self.chatBoards } } });
  }, [self]);
  return (
    <>
      <Head>
        <title>등산친구 필요할땐? 마운팅!</title>
        <link rel="icon" href="/mountingLogo.png" />
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0"></meta>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
      </Head>
      <input type="checkbox" id="my-modal-4" className="modal-toggle modal-bottom sm:modal-middle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer" id={"modal"}>
        <label className="" htmlFor="">
          <a
            href={`tel:${customSt.phone}`}
            className="btn-primary w-64 h-64 flex flex-col justify-center items-center rounded-xl"
          >
            <AiOutlinePhone size={150} />
            <div className="text-3xl">통화하기</div>
          </a>
        </label>
      </label>
      <main className="app text-base">
        <NextIntlClientProvider locale={"ko"}>
          <GqlProvider
            pageMap={
              new PageMap({
                public: {
                  paths: ["/"],
                  home: "/public",
                  unauthorized: "/public",
                },
                admin: {
                  paths: ["/admin"],
                  home: "/asdf",
                  unauthorized: "/asdf",
                },
                user: {
                  paths: ["/ususe"],
                  home: "/tour",
                  unauthorized: "/asdfdd",
                },
              })
            }
            environment={env.environment}
            uri={env.endpoint}
            ws={env.ws}
            whoAmI={st.do.whoAmI}
            useSelf={st.use.self}
            init={async () => {
              // st.do.initBoard();
            }}
          >
            {chatBoardId || !pathname ? (
              <Component {...pageProps} />
            ) : pathname.startsWith("/driver") ? (
              <DriverLayout>
                <div className="pb-20">
                  <Component {...pageProps} />
                </div>
              </DriverLayout>
            ) : pathname.startsWith("/tour") || pathname.startsWith("/myPage") ? (
              <MainLayout>
                <div className="pb-20">
                  <Component {...pageProps} />
                </div>
              </MainLayout>
            ) : (
              <UnLoggedInLayout>
                <Component {...pageProps} />
              </UnLoggedInLayout>
            )}
          </GqlProvider>
        </NextIntlClientProvider>
      </main>
    </>
  );
}

export default CustomApp;
