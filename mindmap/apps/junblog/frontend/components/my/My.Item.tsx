// import { Receipts, Views, useMeStore } from "@junblog/frontend/stores/client/useUser";
// import Image from "next/image";
// import Link from "next/link";
// import { MyList } from "./My.List";
// import { Modal } from "@nogql/frontend";
// import { Utils, cnst } from "@nogql/util";

// export const MyItem = () => <></>;

// const MyProfileItem = ({ className }: { className?: string }) => {
//   const user = useMeStore();
//   return (
//     <div className=" border-custom rounded-md p-4 w-fit px-8 mb-5">
//       <div className="flex">
//         <Image
//           src={user.image || "/icon.png"}
//           width={100}
//           height={100}
//           className="bg-white object-cover border-2 border-black "
//           alt="profile"
//         />
//         <div className="ml-5">
//           <div className="font-bold text-3xl">{user.nickname}</div>
//           <div className=" text-zinc-500 text-lg">{user.email}</div>
//           <div>
//             <span>잔액</span>
//             <span className="text-custom2 ml-5">100 SOL</span>
//           </div>
//         </div>
//       </div>
//       <div className="mt-4">
//         <div className="flex">
//           <span className="pr-5">출금 지갑</span>
//           <div className=" flex-grow">
//             <input className="w-full text-custom text-lg btn-hover py-0" disabled value="0xabejdiwejfiewfweifjweifwe" />
//           </div>
//         </div>
//         <div className="mt-2">
//           <div className="flex">
//             <div className="pr-5">입금 지갑</div>
//             <div className="flex-grow text-custom text-lg btn-hover min-w-[200px]">0xabejdiwejfiewfweifjweifwe</div>
//           </div>
//         </div>
//       </div>
//       <div className="flex">
//         <button className="text-custom2 mt-3 px-2 btn-hover border-2 min-h-fit h-10 text-lg font-base">출금하기</button>
//         <button className="text-custom2 mt-3 px-2 btn-hover border-2 min-h-fit h-10 text-lg font-base">
//           출금지갑등록
//         </button>
//         <button className="ml-auto text-custom2 mt-3 px-2 btn-hover border-2 min-h-fit h-10 text-lg font-base">
//           입금하기
//         </button>
//       </div>
//     </div>
//   );
// };

// MyItem.Profile = MyProfileItem;

// export const MyActivityItem = ({ item }: { item: Views | null }) => {
//   return (
//     <tr className="border-b-2 border-dotted">
//       {item ? (
//         <>
//           <td>{Utils.dateToString(item.createdAt)}</td>
//           <td>시청 {item.views}개</td>
//           <td className="text-center">
//             <div className="text-custom2 w-fit mx-auto text-base">{item.views * 3} SOL</div>
//           </td>
//         </>
//       ) : (
//         <>
//           <td>-</td>
//           <td>-</td>
//           <td>-</td>
//         </>
//       )}
//     </tr>
//   );
// };

// MyItem.Activity = MyActivityItem;

// const receiptString = (status: cnst.DepositStatus) => {
//   switch (status) {
//     case "withdraw":
//       return "출금";
//     case "deposit":
//       return "입금";
//     case "exchange":
//       return "레퍼럴 출금";
//   }
// };

// export const MyReceiptItem = ({ item }: { item: Receipts | null }) => {
//   return (
//     <tr className="border-b-2 border-dotted">
//       {item ? (
//         <>
//           <td>{Utils.dateToString(item.createdAt)}</td>
//           <td>{receiptString(item?.status)}</td>
//           <td className="text-center">
//             <div className="text-custom2 w-fit mx-auto text-base">{item.amount} SOL</div>
//           </td>
//         </>
//       ) : (
//         <>
//           <td>-</td>
//           <td>-</td>
//           <td>-</td>
//         </>
//       )}
//     </tr>
//   );
// };

// MyItem.Receipt = MyReceiptItem;

// const MyModal = ({ className }: { className?: string }) => {
//   const event = useMeStore((state) => state.event);
//   const setEvent = useMeStore((state) => state.setEvent);
//   return (
//     <Modal
//       width={450}
//       open={!!event}
//       footer={null}
//       onCancel={setEvent}
//       className="rounded-lg bg-color-sub border-custom px-3 py-2"
//     >
//       <div className="text-center text-2xl font-bold py-2">알림</div>
//       <div className="text-center text-lg">{event}</div>

//       <div className="flex justify-center">
//         <button
//           className="text-custom2 mt-3 px-2 btn-hover border-2 min-h-fit h-10 text-lg font-base"
//           onClick={() => setEvent()}
//         >
//           확인
//         </button>
//       </div>
//     </Modal>
//   );
// };
// MyItem.Modal = MyModal;

export {};
