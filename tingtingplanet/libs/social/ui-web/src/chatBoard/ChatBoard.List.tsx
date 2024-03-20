import * as ChatBoard from ".";
import { DataEditModal, DataListContainer } from "@shared/ui-web";
import { DefaultOf, ModelsProps } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";
import { useEffect } from "react";

export const ChatBoardList = ({
  slice = st.slice.chatBoard,
  init,
}: ModelsProps<slice.ChatBoardSlice, gql.ChatBoard>) => {
  return (
    <DataListContainer
      init={init}
      slice={slice}
      renderItem={ChatBoard.Item}
      renderDashboard={ChatBoard.Stat}
      queryMap={gql.chatBoardQueryMap}
      edit={
        <DataEditModal slice={slice} renderTitle={(chatBoard: DefaultOf<gql.ChatBoard>) => `${chatBoard.name}`}>
          <ChatBoard.Edit slice={slice} />
        </DataEditModal>
      }
      type="list"
      columns={["type", { key: "field", render: (field: string) => <span>{field}</span> }, "status", "createdAt"]}
      actions={(chatBoard: gql.LightChatBoard, idx) => [
        "remove",
        "edit",
        {
          type: "approve",
          render: () => <ChatBoard.Action.Approve chatBoard={chatBoard} idx={idx} slice={slice} />,
        },
      ]}
    />
  );
};

// ! 샘플용 리스트입니다. 수정 또는 삭제가 필요합니다.
// const ChatBoardListInSelf = ({
//   slice = st.slice.chatBoard,
//   self,
// }: {
//   slice?: slice.ChatBoardSlice;
//   self: gql.shared.User;
// }) => {
//   const { t } = useTranslation();
//   if (!self.id) {
//     window.alert(`로그인이 필요합니다.`);
//     router.push(pageMap.getUnauthorized());
//   }
//   return (
//     <DataTableList
//       slice={slice}
//       init={{ query: { from: self.id } }}
//       columns={["id", "createdAt", "status"]}
//       onItemClick={(chatBoard: gql.LightChatBoard) => router.push(`chatBoard/${chatBoard.id}`)}
//     />
//   );
// };

const ChatBoardListInSelf = ({
  slice = st.slice.chatBoard,
  chatBoardList,
}: {
  slice?: slice.ChatBoardSlice;
  chatBoardList: gql.LightChatBoard[];
}) => {
  useEffect(() => {
    console.log(chatBoardList);
  }, []);
  return (
    <div className="pt-3">
      {chatBoardList.map((chatBoard) => (
        <ChatBoard.Item.InSelf chatBoard={chatBoard} />
      ))}
    </div>
  );
};

ChatBoardList.InSelf = ChatBoardListInSelf;
