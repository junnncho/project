// import { useRegisterVideo } from "@junblog/frontend/stores/server/useApi";
// import * as My from ".";
// import Link from "next/link";
// import { useMeStore } from "@junblog/frontend/stores/client";
// import { MyItem } from "./My.Item";

// export const MyList = () => <></>;

// const MyActivityList = () => {
//   const views = useMeStore((state) => state.views);
//   return (
//     <table className="table-auto border-collapse border-hidden rounded-md out-border w-full">
//       {/* head */}
//       <thead className="border-b-2">
//         <tr>
//           <th>날짜</th>
//           <th>종류</th>
//           <th>금액</th>
//         </tr>
//       </thead>
//       <tbody className="text-center text-lg">
//         {/* row 1 */}
//         {views.length > 0 ? (
//           views.map((view, index) => <MyItem.Activity item={view} key={`view-${index}`} />)
//         ) : (
//           <MyItem.Activity item={null} key={`view-0`} />
//         )}
//       </tbody>
//     </table>
//   );
// };

// MyList.Activity = MyActivityList;

// const MyReceiptList = () => {
//   const receipts = useMeStore((state) => state.receipts);
//   return (
//     <table className="table-auto border-collapse border-hidden rounded-md out-border w-full">
//       {/* head */}
//       <thead className="border-b-2">
//         <tr>
//           <th>날짜</th>
//           <th>종류</th>
//           <th>금액</th>
//         </tr>
//       </thead>
//       <tbody className="text-center text-lg">
//         {/* row 1 */}
//         {receipts.length > 0 ? (
//           receipts.map((receipt, index) => <MyItem.Receipt item={receipt} key={`receipt-${index}`} />)
//         ) : (
//           <MyItem.Receipt item={null} key={`receipt-0`} />
//         )}
//       </tbody>
//     </table>
//   );
// };

// MyList.Receipt = MyReceiptList;
export {}