import { DataEditModal } from "@shared/ui-web";
import { DefaultOf } from "@shared/util-client";
import { Tour } from "@seniorlove/frontend/components";
import { gql, st } from "@seniorlove/frontend/stores";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditTourInDriver() {
  const params = useSearchParams();
  const id = params.get("tourId") as string;
  const tourForm = st.use.tourForm();
  const router = useRouter();

  useEffect(() => {
    st.do.editTourinDriver(id);
  }, []);
  return <Tour.Edit.InDriver slice={st.slice.tourinDriver} />;
}
