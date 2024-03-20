import * as gql from "../gql";
import * as slice from "../slice";
import { Call, SetGet, State } from "@shared/util-client";
import { cnst } from "@shared/util";
import type { RootState } from "../store";

// ? Store는 다른 store 내 상태와 상호작용을 정의합니다. 재사용성이 필요하지 않은 단일 기능을 구현할 때 사용합니다.
// * 1. State에 대한 내용을 정의하세요.
const state = ({ set, get, pick }: SetGet<slice.GroupCallSliceState>) => ({
  ...slice.makeGroupCallSlice({ set, get, pick }),
  // peers: [] as Call[],
  // selfCallConnection: { userId: "", mic: 100, cam: true } as CallConnection,
  callConnections: [] as gql.CallConnection[],
  videoDevices: [] as MediaDeviceInfo[],
  audioDevices: [] as MediaDeviceInfo[],
  ...({
    mediaStream: null,
    screenStream: null,
    mic: 100,
    cam: true,
  } as gql.CallConnection),
  otherCallConnectionMap: new Map<string, gql.CallConnection>(),
  otherCallMap: new Map<string, Call>(),
});

// * 2. Action을 내용을 정의하세요. Action은 모두 void 함수여야 합니다.
// * 다른 action을 참조 시 get() as <Model>State 또는 RootState 를 사용하세요.
const actions = ({ set, get, pick }: SetGet<typeof state>) => ({
  initMediaStream: async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter((device) => device.kind === "videoinput");
    const audioDevices = devices.filter((device) => device.kind === "audioinput");
    const defaultVideo = videoDevices.find((device) => device.deviceId === "default") ?? videoDevices[0];
    const defaultAudio = audioDevices.find((device) => device.deviceId === "default") ?? audioDevices[0];
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: defaultVideo && {
        groupId: defaultVideo.groupId,
        width: 200,
        height: 130,
        facingMode: "user",
      },
      audio: defaultAudio && { groupId: defaultAudio.groupId },
    });
    mediaStream.getAudioTracks()[0].enabled = true;
    mediaStream.getVideoTracks()[0].enabled = false;
    set({ videoDevices, audioDevices, mediaStream, mic: 100, cam: false });
  },
  addCall: async (userId: string, selfId: string, initiator: boolean) => {
    const { otherCallMap, screenStream, addCallConnection, subCallConnection } = get() as RootState;
    const { groupCall, mediaStream } = pick("groupCall", "mediaStream");
    const call = new Call(
      userId,
      groupCall.roomId,
      // `${Math.random()}`,
      selfId,
      initiator,
      mediaStream,
      screenStream,
      (mediaStream) => addCallConnection(userId, mediaStream),
      () => subCallConnection(userId)
    );
    set({ otherCallMap: new Map(otherCallMap).set(userId, call) });
  },
  addCallConnection: (userId: string, mediaStream: MediaStream) => {
    const { otherCallConnectionMap } = get() as RootState;
    const callConnection = {
      mediaStream,
      screenStream: null,
      mic: 100,
      cam: true,
    };
    set({
      otherCallConnectionMap: new Map(otherCallConnectionMap).set(userId, callConnection),
    });
  },
  subCallConnection: (userId: string) => {
    const { otherCallConnectionMap, otherCallMap } = get() as RootState;
    const callConnectionMap = new Map(otherCallConnectionMap);
    const callMap = new Map(otherCallMap);
    callConnectionMap.delete(userId);
    callMap.delete(userId);
    set({ otherCallConnectionMap: callConnectionMap, otherCallMap: callMap });
  },
  leaveGroupCall: async () => {
    const { otherCallMap, otherCallConnectionMap, mediaStream, screenStream } = get();

    // !socket한테 알려줘야함
    mediaStream && mediaStream.getTracks().forEach((track) => track.stop());
    screenStream && screenStream.getTracks().forEach((track) => track.stop());

    set({
      mediaStream: null,
      screenStream: null,
      otherCallMap: new Map(),
      otherCallConnectionMap: new Map(),
      groupCall: "loading",
      groupCallModal: null,
    });
  },
  joinGroupCall: async (roomId: string, type: cnst.GroupCallType) => {
    const { createGroupCall, initMediaStream } = get() as RootState;
    await initMediaStream();
    const groupCall = await gql.createGroupCall({ roomId, type });
    set({ groupCall, groupCallModal: "join" });
  },

  shareScreen: async () => {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: { width: 200, height: 130 },
    });
    set({ screenStream });
  },

  addTrack: (mediaStreamTrack: MediaStreamTrack) => {
    const { mediaStream } = pick("mediaStream");
    mediaStream.addTrack(mediaStreamTrack);
  },

  muteSelf: () => {
    const { mediaStream } = pick("mediaStream");
    mediaStream.getAudioTracks()[0].enabled = false;
    set({ mic: 0 });
  },
  unmuteSelf: () => {
    const { mediaStream } = pick("mediaStream");
    mediaStream.getAudioTracks()[0].enabled = true;
    set({ mic: 100 });
  },
  camOnSelf: () => {
    const { mediaStream } = pick("mediaStream");
    mediaStream.getVideoTracks()[0].enabled = true;
    set({ cam: true });
  },
  camOffSelf: () => {
    const { mediaStream } = pick("mediaStream");
    mediaStream.getVideoTracks()[0].enabled = false;
    set({ cam: false });
  },
  muteOther: (userId: string) => {
    const { otherCallMap, otherCallConnectionMap } = get() as RootState;
    const call = otherCallMap.get(userId);
    const callConnection = otherCallConnectionMap.get(userId);
    if (!call || !callConnection) return;
    callConnection.mic = 0;
    set({ otherCallConnectionMap: new Map(otherCallConnectionMap) });
    call.disableAudioTracks();
  },
  unmuteOther: (userId: string) => {
    const { otherCallMap, otherCallConnectionMap } = get() as RootState;
    const call = otherCallMap.get(userId);
    const callConnection = otherCallConnectionMap.get(userId);
    if (!call || !callConnection) return;
    callConnection.mic = 100;
    set({ otherCallConnectionMap: new Map(otherCallConnectionMap) });
    if (!call) return;
    call.enableAudioTracks();
  },
  camOnOther: (userId: string) => {
    const { otherCallMap, otherCallConnectionMap } = get() as RootState;
    const call = otherCallMap.get(userId);
    const callConnection = otherCallConnectionMap.get(userId);
    if (!call || !callConnection) return;
    callConnection.cam = true;
    set({ otherCallConnectionMap: new Map(otherCallConnectionMap) });
    call.enableVideoTracks();
  },
  camOffOther: (userId: string) => {
    const { otherCallMap, otherCallConnectionMap } = get() as RootState;
    const call = otherCallMap.get(userId);
    const callConnection = otherCallConnectionMap.get(userId);
    if (!call || !callConnection) return;
    callConnection.cam = false;
    set({ otherCallConnectionMap: new Map(otherCallConnectionMap) });
    call.disableVideoTracks();
  },
});

export type GroupCallState = State<typeof state, typeof actions>;
// * 3. ChildSlice를 추가하세요. Suffix 규칙은 일반적으로 "InModel" as const 로 작성합니다.
export const addGroupCallToStore = ({ set, get, pick }: SetGet<GroupCallState>) => ({
  ...state({ set, get, pick }),
  ...actions({ set, get, pick }),
});
