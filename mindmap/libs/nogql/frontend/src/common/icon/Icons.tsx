import { twMerge } from "tailwind-merge";

interface IconProps {
  className?: string;
  viewBox?: string;
  width?: string | number;
}
// https://github.com/oAuth-Buttons/logo-providers/tree/master/svg
export const Github = ({ className, viewBox = "0 0 24 24", width = "40" }: IconProps) => {
  return (
    <svg
      className={twMerge("fill-black", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={width}
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
};

export const Kakao = ({ className, viewBox = "-75 -90 350 350", width = "40" }: IconProps) => {
  return (
    <svg
      className={twMerge("fill-[#3c1e1e] bg-[#FEE500]", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={width}
    >
      <polygon points="45 140 40 185 90 150 45 140" />
      <ellipse cx="100" cy="80" rx="100" ry="80" />
    </svg>
  );
};

export const Naver = ({ className, viewBox = "0 0 200 200", width = "40" }: IconProps) => {
  return (
    <svg
      className={twMerge("fill-[#1ec800]", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={width}
    >
      <polygon points="115.9,145.8 83.7,98.4 83.7,145.8 50,145.8 50,54.3 84.2,54.3 116.4,101.6 116.4,54.3    150,54.3 150,145.8 115.9,145.8" />
    </svg>
  );
};
export const Google = ({ className, viewBox = "5 5 25 25", width = "40" }: IconProps) => {
  return (
    <svg
      className={twMerge("", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={width}
    >
      <path
        className="logo"
        fill="#4285f4"
        d="M26.64,18.2a10.34,10.34,0,0,0-.16-1.84H18v3.48h4.84A4.14,4.14,0,0,1,21,22.56v2.26H24a8.78,8.78,0,0,0,2.68-6.62Z"
      />
      <path
        className="bottom logo"
        fill="#34a853"
        d="M18,27a8.59,8.59,0,0,0,6-2.18L21,22.56A5.43,5.43,0,0,1,13,19.71H10V22a9,9,0,0,0,8,5Z"
      />
      <path className="left logo" fill="#fbbc05" d="M13,19.71a5.32,5.32,0,0,1,0-3.42V14H10A9,9,0,0,0,10,22l3-2.33Z" />
      <path
        className="top logo"
        fill="#ea4335"
        d="M18,12.58a4.86,4.86,0,0,1,3.44,1.35L24,11.34A8.65,8.65,0,0,0,18,9a9,9,0,0,0-8,5l3,2.33a5.36,5.36,0,0,1,5-3.71Z"
      />
    </svg>
  );
};

export const Facebook = ({ className, viewBox = "5 5 38 38", width = "40" }: IconProps) => {
  return (
    <svg
      className={twMerge("fill-[#3C5A99] rounded-full", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={width}
    >
      <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z" />
      <path
        fill="#fff"
        d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
      />
    </svg>
  );
};

export const Discord = ({ className, viewBox = "0 -28.5 256 256", width = "800" }: IconProps) => {
  return (
    <svg
      className={twMerge("fill-[#7289DA]", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={width}
    >
      <path
        d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
        fill="#5865F2"
        fill-rule="nonzero"
      />
    </svg>
  );
};
export const Instagram = ({ className, viewBox = "0 0 50 50", width = "40" }: IconProps) => {
  return (
    <svg
      className={twMerge("fill-[#e53c5c]", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={width}
    >
      <path
        d="M256,49.47c67.27,0,75.23.26,101.8,1.47,24.56,1.12,37.9,5.22,46.78,8.67a78.05,78.05,0,0,1,29,18.84,78.05,78.05,0,0,1,18.84,29c3.45,8.88,7.55,22.22,8.67,46.78,1.21,26.56,1.47,34.53,1.47,101.8s-.26,75.23-1.47,101.8c-1.12,24.56-5.22,37.9-8.67,46.78a83.43,83.43,0,0,1-47.81,47.81c-8.88,3.45-22.22,7.55-46.78,8.67-26.56,1.21-34.53,1.47-101.8,1.47s-75.24-.26-101.8-1.47c-24.56-1.12-37.9-5.22-46.78-8.67a78.05,78.05,0,0,1-29-18.84,78.05,78.05,0,0,1-18.84-29c-3.45-8.88-7.55-22.22-8.67-46.78-1.21-26.56-1.47-34.53-1.47-101.8s.26-75.23,1.47-101.8c1.12-24.56,5.22-37.9,8.67-46.78a78.05,78.05,0,0,1,18.84-29,78.05,78.05,0,0,1,29-18.84c8.88-3.45,22.22-7.55,46.78-8.67,26.56-1.21,34.53-1.47,101.8-1.47m0-45.39c-68.42,0-77,.29-103.87,1.52S107,11.08,91,17.3A123.49,123.49,0,0,0,46.36,46.36,123.49,123.49,0,0,0,17.3,91C11.08,107,6.82,125.32,5.6,152.13S4.08,187.58,4.08,256s.29,77,1.52,103.87S11.08,405,17.3,421a123.49,123.49,0,0,0,29.06,44.62A123.49,123.49,0,0,0,91,494.69c16,6.23,34.34,10.49,61.15,11.71s35.45,1.52,103.87,1.52,77-.29,103.87-1.52S405,500.92,421,494.69A128.82,128.82,0,0,0,494.69,421c6.23-16,10.49-34.34,11.71-61.15s1.52-35.45,1.52-103.87-.29-77-1.52-103.87S500.92,107,494.69,91a123.49,123.49,0,0,0-29.06-44.62A123.49,123.49,0,0,0,421,17.3C405,11.08,386.68,6.82,359.87,5.6S324.42,4.08,256,4.08Z"
        transform="translate(-4.08 -4.08)"
      />
      <path
        d="M256,126.64A129.36,129.36,0,1,0,385.36,256,129.36,129.36,0,0,0,256,126.64ZM256,340a84,84,0,1,1,84-84A84,84,0,0,1,256,340Z"
        transform="translate(-4.08 -4.08)"
      />
      <circle cx="386.4" cy="117.44" r="30.23" />
    </svg>
  );
};

export const Apple = ({ className, viewBox = "-5 -5 40 40", width = "40" }: IconProps) => {
  return (
    <svg
      className={twMerge("fill-black", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={width}
    >
      <path d="M25.565,9.785c-0.123,0.077-3.051,1.702-3.051,5.305c0.138,4.109,3.695,5.55,3.756,5.55 c-0.061,0.077-0.537,1.963-1.947,3.94C23.204,26.283,21.962,28,20.076,28c-1.794,0-2.438-1.135-4.508-1.135 c-2.223,0-2.852,1.135-4.554,1.135c-1.886,0-3.22-1.809-4.4-3.496c-1.533-2.208-2.836-5.673-2.882-9 c-0.031-1.763,0.307-3.496,1.165-4.968c1.211-2.055,3.373-3.45,5.734-3.496c1.809-0.061,3.419,1.242,4.523,1.242 c1.058,0,3.036-1.242,5.274-1.242C21.394,7.041,23.97,7.332,25.565,9.785z M15.001,6.688c-0.322-1.61,0.567-3.22,1.395-4.247 c1.058-1.242,2.729-2.085,4.17-2.085c0.092,1.61-0.491,3.189-1.533,4.339C18.098,5.937,16.488,6.872,15.001,6.688z" />
    </svg>
  );
};

export const EmptyProfile = ({ className, viewBox = "312.809 0 401 401", width = "40" }: IconProps) => {
  return (
    <svg
      className={twMerge("", className)}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={width}
      enableBackground="new 312.809 0 401 401"
      version="1.1"
      viewBox={viewBox}
    >
      <g transform="matrix(1.223 0 0 1.223 -467.5 -843.44)">
        <path
          fill="#AEB4B7"
          d="m802.38 908.08c-84.515 0-153.52 48.185-157.38 108.62h314.79c-3.87-60.44-72.9-108.62-157.41-108.62z"
        />
        <path
          fill="#AEB4B7"
          d="m881.37 818.86c0 46.746-35.106 84.641-78.41 84.641s-78.41-37.895-78.41-84.641 35.106-84.641 78.41-84.641c43.31 0 78.41 37.9 78.41 84.64z"
        />
      </g>{" "}
    </svg>
  );
};

export const ShareScreenOnIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path
      fill="greenyellow"
      d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.11-.9-2-2-2H4c-1.11 0-2 .89-2 2v10c0 1.1.89 2 2 2H0v2h24v-2h-4zm-7-3.53v-2.19c-2.78 0-4.61.85-6 2.72.56-2.67 2.11-5.33 6-5.87V7l4 3.73-4 3.74z"
    />
  </svg>
);
export const ShareScreenOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path
      fill="lightgray"
      d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.11-.9-2-2-2H4c-1.11 0-2 .89-2 2v10c0 1.1.89 2 2 2H0v2h24v-2h-4zm-7-3.53v-2.19c-2.78 0-4.61.85-6 2.72.56-2.67 2.11-5.33 6-5.87V7l4 3.73-4 3.74z"
    />
  </svg>
);
export const ReduceIcon = () => (
  <svg className="reduce" width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.35283 22L0.00195312 20.6491L5.88499 14.7661H2.08967V12.8363H9.1657V19.9123H7.23587V16.117L1.35283 22ZM12.8704 9.13158V2.05556H14.8002V5.85088L20.6511 0L22.002 1.35088L16.1511 7.20176H19.9464V9.13158H12.8704Z"
      fill="black"
    />
  </svg>
);
export const InventoryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.2 22.14V7.38C0.92 7.34 0.65 7.14 0.39 6.78C0.13 6.42 0 6.03 0 5.61V1.8C0 1.34 0.18 0.925 0.54 0.555C0.9 0.185 1.32 0 1.8 0H22.2C22.66 0 23.075 0.185 23.445 0.555C23.815 0.925 24 1.34 24 1.8V5.61C24 6.03 23.87 6.42 23.61 6.78C23.35 7.14 23.08 7.34 22.8 7.38V22.14C22.8 22.6 22.615 23.025 22.245 23.415C21.875 23.805 21.46 24 21 24H3C2.52 24 2.1 23.805 1.74 23.415C1.38 23.025 1.2 22.6 1.2 22.14ZM3.16783 7.49392V22.0322H20.8322V7.49392H3.16783ZM22.0322 5.52608V1.96783H1.96783V5.52608H22.0322ZM8.4 13.8778H15.6V11.91H8.4V13.8778Z"
      fill="black"
    />
  </svg>
);
export const PeoplesIcon = () => (
  <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="white"
      d="M.221 16.268a15.064 15.064 0 0 0 1.789 1.9C2.008 18.111 2 18.057 2 18a5.029 5.029 0 0 1 3.233-4.678 1 1 0 0 0 .175-1.784A2.968 2.968 0 0 1 4 9a2.988 2.988 0 0 1 5.022-2.2 5.951 5.951 0 0 1 2.022-.715 4.994 4.994 0 1 0-7.913 6.085 7.07 7.07 0 0 0-2.91 4.098zM23.779 16.268a7.07 7.07 0 0 0-2.91-4.1 4.994 4.994 0 1 0-7.913-6.086 5.949 5.949 0 0 1 2.022.715 2.993 2.993 0 1 1 3.614 4.74 1 1 0 0 0 .175 1.784A5.029 5.029 0 0 1 22 18c0 .057-.008.111-.01.167a15.065 15.065 0 0 0 1.789-1.899z"
    />
    <path
      fill="white"
      d="M18.954 20.284a7.051 7.051 0 0 0-3.085-5.114A4.956 4.956 0 0 0 17 12a5 5 0 1 0-8.869 3.17 7.051 7.051 0 0 0-3.085 5.114 14.923 14.923 0 0 0 1.968.849C7.012 21.088 7 21.046 7 21a5.031 5.031 0 0 1 3.233-4.678 1 1 0 0 0 .175-1.785A2.964 2.964 0 0 1 9 12a3 3 0 1 1 6 0 2.964 2.964 0 0 1-1.408 2.537 1 1 0 0 0 .175 1.785A5.031 5.031 0 0 1 17 21c0 .046-.012.088-.013.133a14.919 14.919 0 0 0 1.967-.849z"
    />
  </svg>
);

export const MicOnIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
    <path
      fill="#54C000"
      d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"
    />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export const MicOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0zm0 0h24v24H0z" fill="transparent" />
    <path
      fill="red"
      d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"
    />
  </svg>
);

export const MicOffSmallIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0zm0 0h24v24H0z" fill="none" />
    <path
      fill="red"
      d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"
    />
  </svg>
);

export const CamOnIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill="#54C000"
      d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"
    />
  </svg>
);

export const CamOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0zm0 0h24v24H0z" fill="none" />
    <path
      fill="red"
      d="M21 6.5l-4 4V7c0-.55-.45-1-1-1H9.82L21 17.18V6.5zM3.27 2L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.54-.18L19.73 21 21 19.73 3.27 2z"
    />
  </svg>
);

export const XButton = () => (
  <svg path="black" fill="black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="24" height="24">
    <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
  </svg>
);

export const SendIcon = ({ width, height }: { width: number; height: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
    <path
      data-name="send-Regular"
      fill="#41416e"
      d="M20.927 3.073a2.782 2.782 0 0 0-2.663-.738L5.151 5.614a3.83 3.83 0 0 0 .049 7.444l4.646 1.093 1.096 4.649a3.773 3.773 0 0 0 3.7 2.953h.028a3.773 3.773 0 0 0 3.714-2.9l3.281-13.118a2.781 2.781 0 0 0-.738-2.662Zm-.718 2.3-3.278 13.111a2.3 2.3 0 0 1-2.277 1.766 2.274 2.274 0 0 1-2.252-1.8l-1.1-4.69 4.228-4.23a.75.75 0 0 0-1.06-1.06l-4.233 4.23-4.69-1.1a2.33 2.33 0 0 1-.031-4.529l13.112-3.28a1.313 1.313 0 0 1 .321-.04 1.3 1.3 0 0 1 1.26 1.621Z"
    />
  </svg>
);

export const InteractionIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 8v4m0 4.01.01-.011M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0 0 12 22Z"
      stroke="black"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const KlaytnIcon = () => (
  <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5723 11.9393L21.8238 20.1819C26.1602 15.5532 26.1602 8.32528 21.8238 3.69662" fill="white" />
    <path d="M12.9697 12.4848L4.83899 20.6059L12.9697 24L21.1003 20.6059" fill="white" />
    <path d="M12.6689 11.6367L21.1015 3.21175L13.3306 0L5.62142 18.7285L12.6689 11.6367Z" fill="white" />
    <path d="M0.923974 11.9392C0.917936 15.0052 2.08205 17.9556 4.176 20.1819L12.2463 0.605158" fill="white" />
  </svg>
);

export const MetamaskIcon = () => (
  <svg baseProfile="basic" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 33.9 31.3">
    <path
      fill="#E17726"
      stroke="#E17726"
      stroke-width=".25"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M32.1.1 18.9 9.8l2.4-5.7 10.8-4z"
    />
    <path
      fill="#E27625"
      stroke="#E27625"
      stroke-width=".25"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m1.8.1 13 9.8-2.3-5.8L1.8.1zm25.6 22.6L23.9 28l7.5 2.1 2.1-7.3-6.1-.1zm-27 .1 2.1 7.3L10 28l-3.5-5.3-6.1.1z"
    />
    <path
      fill="#E27625"
      stroke="#E27625"
      stroke-width=".25"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m9.6 13.6-2.1 3.1 7.4.3-.2-8-5.1 4.6zm14.7 0L19.1 9l-.2 8.1 7.4-.3-2-3.2zM10 28l4.5-2.2-3.9-3L10 28zm9.4-2.2 4.5 2.2-.6-5.2-3.9 3z"
    />
    <path
      fill="#D5BFB2"
      stroke="#D5BFB2"
      stroke-width=".25"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m23.9 28-4.5-2.2.4 2.9v1.2l4.1-1.9zM10 28l4.2 2v-1.2l.4-2.9L10 28z"
    />
    <path
      fill="#233447"
      stroke="#233447"
      stroke-width=".25"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m14.2 20.9-3.7-1.1 2.6-1.2 1.1 2.3zm5.4 0 1.1-2.3 2.6 1.2-3.7 1.1z"
    />
    <path
      fill="#CC6228"
      stroke="#CC6228"
      stroke-width=".25"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m10 28 .6-5.3-4.1.1L10 28zm13.2-5.3.6 5.3 3.5-5.2-4.1-.1zm3.2-5.9-7.4.3.7 3.8 1.1-2.3 2.6 1.2 3-3zm-15.9 3 2.6-1.2 1.1 2.3.7-3.8-7.4-.3 3 3z"
    />
    <path
      fill="#E27525"
      stroke="#E27525"
      stroke-width=".25"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m7.5 16.8 3.1 6.1-.1-3-3-3.1zm15.9 3-.1 3 3.1-6.1-3 3.1zm-8.5-2.7-.7 3.8.9 4.5.2-5.9-.4-2.4zm4 0-.4 2.4.2 5.9.9-4.5-.7-3.8z"
    />
    <path
      fill="#F5841F"
      stroke="#F5841F"
      stroke-width=".25"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.6 20.9-.9 4.5.6.4 3.9-3 .1-3-3.7 1.1zm-9.1-1.1.1 3 3.9 3 .6-.4-.9-4.5-3.7-1.1z"
    />
    <path
      fill="#C0AC9D"
      stroke="#C0AC9D"
      stroke-width=".25"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M19.7 30v-1.2l-.3-.3h-5l-.3.3V30L10 28l1.5 1.2 2.9 2h5.1l3-2 1.4-1.2-4.2 2z"
    />
    <path
      fill="#161616"
      stroke="#161616"
      stroke-width=".25"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.4 25.8-.6-.4h-3.7l-.6.4-.4 2.9.3-.3h5l.3.3-.3-2.9z"
    />
    <path
      fill="#763E1A"
      stroke="#763E1A"
      stroke-width=".25"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m32.6 10.5 1.1-5.4-1.7-5-12.6 9.4 4.9 4.1 6.9 2 1.5-1.8-.7-.4 1.1-1-.8-.6 1.1-.8-.8-.5zM.1 5.1l1.1 5.4-.7.5 1.1.8-.8.6 1.1 1-.7.5 1.5 1.8 6.9-2 4.9-4.1L1.8.1l-1.7 5z"
    />
    <path
      fill="#F5841F"
      stroke="#F5841F"
      stroke-width=".25"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m31.2 15.6-6.9-2 2.1 3.1-3.1 6.1 4.1-.1h6.1l-2.3-7.1zm-21.6-2-6.9 2-2.3 7.1h6.1l4.1.1-3.1-6.1 2.1-3.1zm9.3 3.5.4-7.6 2-5.4h-8.9l2 5.4.4 7.6.2 2.4v5.9h3.7v-5.9l.2-2.4z"
    />
  </svg>
);

export const EthereumIcon = () => (
  <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.99753 0L8.80967 0.638088V19.1523L8.99753 19.3397L17.5914 14.2598L8.99753 0Z" fill="#E7E7E7" />
    <path d="M8.99753 0L0.403564 14.2598L8.99753 19.3397L8.99769 10.3534L8.99753 0Z" fill="white" />
    <path d="M8.99759 20.9668L8.89172 21.0959V27.6909L8.99759 28L17.5968 15.8895L8.99759 20.9668Z" fill="#E7E7E7" />
    <path d="M8.99759 28V20.9668L0.403564 15.8895L8.99759 28Z" fill="white" />
    <path d="M8.99753 19.3397L17.5914 14.2598L8.99769 10.3534L8.99753 19.3397Z" fill="#ACA9A9" />
    <path d="M0.403564 14.2598L8.99753 19.3397L8.99769 10.3534L0.403564 14.2598Z" fill="#DADADA" />
  </svg>
);

export const LuniverseIcon = () => (
  <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21 18.1108H20.9905L10.5597 23.9499L10.5299 24L10.5 23.9833L10.4701 24L10.4403 23.9499L0.00945652 18.1108H0V5.95251L10.5 11.8387L13.6855 10.053L13.7015 13.9194L10.5007 15.7137L10.5 15.7125L10.4993 15.7137L3.45652 11.7657V16.1642L10.5 20.1071L17.5435 16.1642V7.83584L10.5 3.893L7.14039 5.77374L3.68387 3.83227L10.4404 0.0502164L10.4701 0L10.5 0.0167177L10.5299 0L10.5597 0.0500897L21 5.89444L20.9654 5.95251H21V18.1108Z"
      fill="white"
    />
  </svg>
);

export const SurveyIcon = () => (
  <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.55556 15C1.12778 15 0.761444 14.8493 0.456555 14.5479C0.152185 14.246 0 13.8832 0 13.4596V9.95534L2.13889 7.54854L3.24722 8.64604L1.69167 10.3789H12.3083L10.7917 8.68455L11.9 7.58705L14 9.95534V13.4596C14 13.8832 13.8478 14.246 13.5434 14.5479C13.2386 14.8493 12.8722 15 12.4444 15H1.55556ZM1.55556 13.4596H12.4444V11.9193H1.55556V13.4596ZM5.93056 9.1274L3.18889 6.41253C2.89074 6.11729 2.74504 5.75479 2.75178 5.32504C2.758 4.89476 2.91019 4.53201 3.20833 4.23678L7.01944 0.462908C7.31759 0.167674 7.68704 0.0136386 8.12778 0.000802268C8.56852 -0.012034 8.93796 0.129165 9.23611 0.4244L11.9778 3.13927C12.2759 3.43451 12.4315 3.79392 12.4444 4.21752C12.4574 4.64112 12.3148 5.00053 12.0167 5.29577L8.12778 9.14665C7.82963 9.44189 7.46356 9.58617 7.02956 9.57949C6.59504 9.57333 6.2287 9.42263 5.93056 9.1274ZM10.8889 4.23678L8.14722 1.5219L4.29722 5.33428L7.03889 8.04915L10.8889 4.23678Z"
      fill="black"
    />
  </svg>
);

export const CheckIcon = () => (
  <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.46059 8L0 3.47578L1.34809 2.10847L4.46059 5.2702L9.65191 0L11 1.36731L4.46059 8Z" fill="black" />
  </svg>
);

export const InfoIcon = () => (
  <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.5 15.5C3.35775 15.5 0 12.1423 0 8C0 3.85775 3.35775 0.5 7.5 0.5C11.6423 0.5 15 3.85775 15 8C14.9955 12.14 11.64 15.4955 7.5 15.5ZM1.5 8.129C1.51705 9.71462 2.16109 11.229 3.29136 12.3412C4.42163 13.4534 5.94621 14.0729 7.5319 14.0644C9.11759 14.0559 10.6354 13.42 11.7537 12.2957C12.8719 11.1714 13.4997 9.65021 13.4997 8.0645C13.4997 6.47879 12.8719 4.95755 11.7537 3.83328C10.6354 2.709 9.11759 2.07311 7.5319 2.06459C5.94621 2.05606 4.42163 2.6756 3.29136 3.78779C2.16109 4.89998 1.51705 6.41438 1.5 8V8.129ZM9 11.75H6.75V8.75H6V7.25H8.25V10.25H9V11.75ZM8.25 5.75H6.75V4.25H8.25V5.75Z"
      fill="#777777"
    />
  </svg>
);

export const TextSendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.7222 0.277756C19.9762 0.531722 20.0649 0.90738 19.9513 1.24811L13.9168 19.3516C13.8011 19.6986 13.4962 19.9482 13.1331 19.9929C12.77 20.0376 12.4137 19.8694 12.2173 19.5608L7.63689 12.3631L0.43917 7.78274C0.130557 7.58635 -0.0375689 7.22996 0.00712589 6.8669C0.0518208 6.50383 0.301365 6.19886 0.648395 6.08318L18.7519 0.0486858C19.0926 -0.0648915 19.4683 0.0237893 19.7222 0.277756ZM9.5321 11.8089L12.7477 16.8619L17.5525 2.44754L3.13808 7.25233L8.1911 10.4679L13.0172 5.64175C13.3876 5.27145 13.9879 5.27145 14.3582 5.64175C14.7286 6.01206 14.7286 6.61245 14.3582 6.98275L9.5321 11.8089Z"
      fill="black"
    />
  </svg>
);

export const LuniverseBlueIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
    <image
      width="30"
      height="30"
      href="data:image/png;base64,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 z3OC33blBfQQXRUgIHSCIFTuijUYPvNjtfOiFbzVqmYeUihxY2M9rVMKztABtHC7EfTedls479Xl 0LopVhQQNj7CULnrCug7e7Eat3AZ77BiLQ9b14p+fsh5Athzya/Lo7Wpjtb2bcTK/n1o2aB+tGho f1rYWI9mlxASQfXG51EpRaGC5wfIL13No5auiqy81c0YvK7AfQolblQMxyGEdXlq6dtAawb3w6IR Q5xZWw2hj+rzaK2m1FpnCEPlNBfQZ/YitfPCZbz9irU8bF0B/YKQcwSw51GpLodCUz2t7duAVQP6 0tJBfWnx0AG0oKEO61yCIiK1qa3aLQiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiC IAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiC IAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiC IAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiC IAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiC IAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiC IAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiC IAiCIAiCEPP/AcdkpZuuXD5YAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTA4LTE3VDA4OjMwOjIw KzAwOjAw0PYz0AAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0wOC0xN1QwODozMDoyMSswMDowMAfc gNgAAAAASUVORK5CYII="
    />
  </svg>
);
