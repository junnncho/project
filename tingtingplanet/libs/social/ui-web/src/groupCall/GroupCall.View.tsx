import { ReactNode } from "react";
import { RecentTime } from "@shared/ui-web";
import { client } from "@shared/util-client";
import { gql, slice, st, usePage } from "@social/data-access";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef, useState } from "react";
//!env로 옮겨야함

interface GroupCallViewProps {
  self: string;
  groupCall: gql.GroupCall;
  className?: string;
  slice?: slice.GroupCallSlice;
  renderBlind?: ReactNode;
  actions?: ReactNode;
}
// View를 작성하세요. 텍스트는 locale을 등록하여 사용하고, 내부 구현은 자유롭게 진행합니다.
export const GroupCallView = ({ className, groupCall, slice = st.slice.groupCall }: GroupCallViewProps) => {
  const { l } = usePage();
  return (
    <div className={twMerge(className, ``)}>
      <div className="flex justify-between p-2 mt-4 mb-0 text-2xl border-b border-gray-200">
        <h3>
          {l("groupCall.id")}-{groupCall.id}
        </h3>
      </div>
      <div className="flex justify-between p-4 mt-0 text-xs bg-gray-50 md:text-base">
        <div>{groupCall.status}</div>
        <RecentTime
          date={groupCall.createdAt}
          breakUnit="second"
          timeOption={{ dateStyle: "short", timeStyle: "short" }}
        />
      </div>
    </div>
  );
};

interface GroupCallViewConnectionProps {
  selfId: string;
  groupCall: gql.GroupCall;
  className?: string;
  slice?: slice.GroupCallSlice;
  renderBlind?: ReactNode;
  actions?: ReactNode;
}

const GroupCallViewConnection = ({
  selfId,
  className,
  groupCall,
  renderBlind,
  slice = st.slice.groupCall,
  actions,
}: GroupCallViewConnectionProps) => {
  const mediaStream = st.use.mediaStream();
  const screenStream = st.use.screenStream();
  const groupCallModal = st.use.groupCallModal();
  const [isTalk, setIsTalk] = useState(false);

  const cam = st.use.cam();
  const localVideo = useRef<HTMLVideoElement>(null);
  const shareVideo = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!client.socket) return;
    client.socket.on("introduce", ({ userId }) => st.do.addCall(userId, selfId, false));
    client.socket.on("welcome", ({ userId }) => st.do.addCall(userId, selfId, true));
    client.socket.emit("join", { userId: selfId, roomId: groupCall.roomId });
    return () => {
      if (!client.socket) return;
      client.socket.emit("leave", { userId: selfId });
      client.socket.off("introduce");
      client.socket.off("welcome");
    };
  }, []);
  useEffect(() => {
    if (!localVideo.current || !mediaStream) return;
    localVideo.current.srcObject = mediaStream;
    const audioContext = new AudioContext();
    const mediaStreamAudioSourceNode = audioContext.createMediaStreamSource(mediaStream);
    const analyserNode = audioContext.createAnalyser();
    mediaStreamAudioSourceNode.connect(analyserNode);
    const pcmData = new Float32Array(analyserNode.fftSize);
    const checkVolume = () => {
      analyserNode.getFloatTimeDomainData(pcmData);
      let sumSquares = 0.0;
      for (const amplitude of pcmData) sumSquares += amplitude * amplitude;
      if (sumSquares > 0.1) setIsTalk(true);
      else setIsTalk(false);
    };
    const interval = setInterval(checkVolume, 100);
    return () => {
      clearInterval(interval);
    };
  }, [mediaStream]);

  useEffect(() => {
    if (!shareVideo.current) return;
    shareVideo.current.srcObject = screenStream;
  }, [screenStream]);
  console.log(localVideo.current?.srcObject);
  return (
    <div>
      <div
        className={` w-[200px] h-[130px] rounded-md relative items-center justify-center flex m-5 z-[1] ${
          !cam && "bg-slate-700"
        }`}
      >
        <video
          className={`rounded-md ${cam ? "block" : "hidden "} w-auto h-auto webcam`}
          ref={localVideo}
          autoPlay={true}
          muted={true}
          playsInline={true}
          style={{ transform: "rotateY(180deg)" }}
        />
        {renderBlind
          ? renderBlind
          : !cam && (
              <div className="absolute w-[100%] h-[100%] rounded-md bg-slate-800 text-white items-center justify-center flex text-[22px]">
                Cam off
              </div>
            )}
        <div
          className="absolute w-[105%] h-[105%] rounded-md z-[-1] "
          style={{ backgroundColor: isTalk ? "#9ACD32" : "transparent" }}
        />
        {actions}
      </div>
      {screenStream && (
        <video
          className={` rounded-md ${"block"} w-auto h-auto}`}
          ref={shareVideo}
          autoPlay={true}
          muted={true}
          playsInline={true}
        />
      )}
    </div>
  );
};
GroupCallView.Connection = GroupCallViewConnection;
