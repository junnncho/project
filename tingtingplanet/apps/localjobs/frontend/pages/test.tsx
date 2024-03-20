import { Job } from "@localjobs/frontend/components";
import { st } from "@localjobs/frontend/stores";
import { useEffect, useState } from "react";
import Image from "next/image";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { Expo, ExpoPushMessage } from "expo-server-sdk";
import { Input } from "@shared/ui-web";

const sendNotification = async (expoPushToken: string, data: any) => {
  const expo = new Expo({ accessToken: "Em0LFD8-LnesYW90pqn7_EFgwBbhsn7aAZej-ID" });

  const chunks = expo.chunkPushNotifications([{ to: expoPushToken, sound: "default", ...data }]);
  console.log("CHUNKS", chunks);
  const tickets: any[] = [];
  if (!Expo.isExpoPushToken(expoPushToken)) {
    console.error(`Push token ${expoPushToken} is not a valid Expo push token`);
  }
  for (const chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log("TICKET", ticketChunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }
  console.log("TICKETS", tickets);

  let response = "";

  for (const ticket of tickets) {
    if (ticket.status === "error") {
      if (ticket.details && ticket.details.error === "DeviceNotRegistered") {
        response = "DeviceNotRegistered";
      }
    }

    if (ticket.status === "ok") {
      response = ticket.id;
    }
  }

  return response;
};

export default function MyPage() {
  const router = useRouter();
  const [state, setState] = useState("");

  return (
    <div className="pb-20 pt-4">
      <button
        className=" w-full btn btn-primary h-12 rounded my-2 text-white text-3xl"
        onClick={() => router.push("/")}
      >
        메인으로
      </button>
      <Input
        className=""
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
      />
      <button
        className=" w-full btn btn-primary h-12 rounded my-2 text-white text-3xl"
        onClick={() => sendNotification(state, { data: { data: "messi here" }, title: "hello", body: "fuck" })}
      >
        푸시알림보내기
      </button>
    </div>
  );
}
