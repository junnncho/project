import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import { MdVideocam, MdVideocamOff } from "react-icons/md";
import { gql, slice, st } from "@social/data-access";
import { useEffect, useRef, useState } from "react";
interface MicActiveSelfProps {
  slice?: slice.GroupCallSlice;
  groupCall?: gql.LightGroupCall;
}
export const MicActiveSelf = ({ slice = st.slice.groupCall, groupCall }: MicActiveSelfProps) => {
  return (
    <button className={`bg-transparent text-[24px] text-lime-400`} onClick={() => st.do.muteSelf()}>
      <BsFillMicFill />
    </button>
  );
};
interface MicInactiveSelfProps {
  slice?: slice.GroupCallSlice;
  groupCall?: gql.LightGroupCall;
}
export const MicInactiveSelf = ({ slice = st.slice.groupCall, groupCall }: MicInactiveSelfProps) => {
  return (
    <button className={`bg-transparent text-[24px] text-red-400`} onClick={() => st.do.unmuteSelf()}>
      <BsFillMicMuteFill />
    </button>
  );
};
interface CamActiveSelfProps {
  slice?: slice.GroupCallSlice;
  groupCall?: gql.LightGroupCall;
}
export const CamActiveSelf = ({ slice = st.slice.groupCall, groupCall }: CamActiveSelfProps) => {
  return (
    <button className={`bg-transparent text-[24px] text-lime-400`} onClick={() => st.do.camOffSelf()}>
      <MdVideocam />
    </button>
  );
};
interface CamInactiveSelfProps {
  slice?: slice.GroupCallSlice;
  groupCall?: gql.LightGroupCall;
}
export const CamInactiveSelf = ({ slice = st.slice.groupCall, groupCall }: CamInactiveSelfProps) => {
  return (
    <button className={`bg-transparent text-[24px] text-red-400`} onClick={() => st.do.camOnSelf()}>
      <MdVideocamOff />
    </button>
  );
};
interface MicActiveProps {
  userId: string;
  slice?: slice.GroupCallSlice;
  groupCall?: gql.LightGroupCall;
}
export const MicActive = ({ userId, slice = st.slice.groupCall, groupCall }: MicActiveProps) => {
  return (
    <button className={`bg-transparent text-[24px] text-lime-400`} onClick={() => st.do.muteOther(userId)}>
      <BsFillMicFill />
    </button>
  );
};
interface MicInactiveProps {
  userId: string;
  slice?: slice.GroupCallSlice;
  groupCall?: gql.LightGroupCall;
}
export const MicInactive = ({ userId, slice = st.slice.groupCall, groupCall }: MicInactiveProps) => {
  return (
    <button className={`bg-transparent text-[24px] text-red-400`} onClick={() => st.do.unmuteOther(userId)}>
      <BsFillMicMuteFill />
    </button>
  );
};
interface CamActiveProps {
  userId: string;
  slice?: slice.GroupCallSlice;
  groupCall?: gql.LightGroupCall;
}
export const CamActive = ({ userId, slice = st.slice.groupCall, groupCall }: CamActiveProps) => {
  return (
    <button className={`bg-transparent text-[24px] text-lime-400`} onClick={() => st.do.camOffOther(userId)}>
      <MdVideocam />
    </button>
  );
};
interface CamInactiveProps {
  userId: string;
  slice?: slice.GroupCallSlice;
  groupCall?: gql.LightGroupCall;
}
export const CamInactive = ({ userId, slice = st.slice.groupCall, groupCall }: CamInactiveProps) => {
  return (
    <button className={`bg-transparent text-[24px] text-red-400`} onClick={() => st.do.camOnOther(userId)}>
      <MdVideocamOff />
    </button>
  );
};

export const OtherCalls = () => {
  // const otherCallMap = st.use.otherCallMap();
  const otherCallConnectionMap = st.use.otherCallConnectionMap();
  const OtherCall = ({ userId, callConnection }: { userId: string; callConnection: gql.CallConnection }) => {
    const { cam, mic, mediaStream } = callConnection;
    const [isTalk, setIsTalk] = useState(false);
    const localVideo = useRef<HTMLVideoElement>(null);

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

        for (const amplitude of pcmData) {
          sumSquares += amplitude * amplitude;
        }
        if (sumSquares > 0.1) setIsTalk(true);
        else setIsTalk(false);
      };
      const interval = setInterval(checkVolume, 100);

      return () => {
        clearInterval(interval);
      };
    }, [mediaStream]);
    return (
      <div className=" w-[200px] h-[130px] relative items-center justify-center flex m-5">
        <div
          className="absolute w-[105%] h-[105%] rounded-md z-[0]"
          style={{ backgroundColor: isTalk ? "#9ACD32" : "transparent" }}
        />
        <video
          className={` rounded-md ${cam ? "block" : "hidden"} w-auto h-auto webcam`}
          ref={localVideo}
          autoPlay={true}
          muted={false}
          playsInline={true}
          style={{ transform: "rotateY(180deg)" }}
        />
        {!cam && (
          <div className="absolute w-[100%] h-[100%] rounded-md bg-slate-800 text-white items-center justify-center flex text-[22px]">
            Cam off
          </div>
        )}
        <div className="absolute bottom-0 gap-5">
          {cam ? <CamActive userId={userId} /> : <CamInactive userId={userId} />}
          {mic > 0 ? <MicActive userId={userId} /> : <MicInactive userId={userId} />}
        </div>
      </div>
    );
  };

  return (
    <>
      {[...otherCallConnectionMap.entries()].map(([userId, callConnection]) => (
        <OtherCall userId={userId} callConnection={callConnection} />
      ))}
    </>
  );
};
