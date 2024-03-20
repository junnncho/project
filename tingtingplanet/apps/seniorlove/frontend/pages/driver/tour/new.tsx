import { DataEditModal } from "@shared/ui-web";
import { DefaultOf } from "@shared/util-client";
import { Tour } from "@seniorlove/frontend/components";
import { gql, st } from "@seniorlove/frontend/stores";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewTour() {
  const self = st.use.self();
  const router = useRouter();
  useEffect(() => {
    st.do.newTourinDriver({ driver: self });
  }, []);
  return <Tour.Edit.InDriver slice={st.slice.tourinDriver} />;
}
