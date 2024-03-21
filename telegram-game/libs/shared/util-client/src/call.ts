import Peer from "simple-peer";
export const stunServer = "stun:stun4.l.google.com:19302";
export class Call {
  initiator: boolean;
  peer: Peer.Instance;
  constructor(initiator: boolean, localStream: MediaStream, screenStream?: MediaStream) {
    this.initiator = initiator;
    this.peer = new Peer({
      initiator: this.initiator,
      streams: [localStream, ...(screenStream ? [screenStream] : [])],
      // trickle: false,
      config: { iceServers: [{ urls: stunServer }] },
    });
  }
  connect(otherId: string) {
    if (!this.peer) return;
    if (this.peer.destroyed) return;
    this.peer.signal(otherId);
  }
}

export type StreamConfig = {
  id: string;
  socketId: string;
  nickName: string;
  mic: number;
  cam: boolean;
  muted: boolean;
  blind: boolean;
  isTalk: boolean;
  quality: number;
};
export type PeerStream = StreamConfig & {
  call: Call;
};
export type Media = {
  id: string;
  label: string;
};
export type MyStream = StreamConfig & {
  forceMute: boolean;
  localStream: MediaStream | null;
  screenStream: MediaStream | null;
};
export type InitForm = {
  roomId: string;
  userId: string;
  nickName: string;
};

export const defaultMyStream: MyStream = {
  mic: 100,
  forceMute: false,
  isTalk: false,
  cam: false,
  muted: false,
  blind: true,
  id: "",
  nickName: "",
  socketId: "",
  quality: 0,
  localStream: null,
  screenStream: null,
};

export const getUserMedia = async (opt?: MediaStreamConstraints) => {
  const newStream = await navigator.mediaDevices.getUserMedia(opt);
  return newStream;
};

export const checkVolume = (stream: MediaStream) => {
  const audioContext = new AudioContext();
  const mediaStreamAudioSourceNode = audioContext.createMediaStreamSource(stream);
  const analyserNode = audioContext.createAnalyser();
  mediaStreamAudioSourceNode.connect(analyserNode);
  const pcmData = new Float32Array(analyserNode.fftSize);
  const asd = () => {
    analyserNode.getFloatTimeDomainData(pcmData);
    let sumSquares = 0.0;
    for (const amplitude of pcmData) {
      sumSquares += amplitude * amplitude;
    }
    return sumSquares;
  };
  return asd;
  // javascriptNode.onaudioprocess = () => {
  //   const array = new Uint8Array(analyser.frequencyBinCount);
  //   analyser.getByteFrequencyData(array);
  //   const values = array.reduce((a, b) => a + b);
  //   const average = values / array.length;
  //   console.log(average);
  // };
};
