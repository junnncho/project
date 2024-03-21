import { motion as m } from 'framer-motion';

// interface AniProps {
//     children: React.ReactNode;
//     className?: string;
//     style?: React.CSSProperties;
//     onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
//     props:any
//     }
interface AniProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: any;
  scale?: number;
  duration?: number;
  select?: boolean;
  onDragStart?: any;
  draggable?: boolean;
}

export const ButtonY = ({ scale, duration, ...props }: AniProps) => {
  return (
    <m.button
      {...props}
      initial={{ translateY: -7 }}
      animate={{ translateY: 0, transition: { duration: 0.3 } }}
      whileHover={{
        scale: scale || 1.1,
        transition: { duration: duration || 0.3 },
      }}
      style={{ transform: 'translate3d(0, 0, 0)' }}
      whileTap={{ scale: 0.7, transition: { duration: 0.1 } }}
    >
      {/* // onClick={onClick} className={className} style={style}> */}
      {props.children}
    </m.button>
  );
};

export const ButtonYEnlarge = (props: any) => {
  return (
    <m.button
      {...props}
      initial={{ translateY: -7 }}
      animate={{ translateY: 0 }}
      style={{ transform: 'translate3d(0, 0, 0)' }}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 1.8, transition: { duration: 0.3 } }}
    >
      {/* // onClick={onClick} className={className} style={style}> */}
      {props.children}
    </m.button>
  );
};

export const ButtonX = (props: any) => {
  return (
    <m.button
      {...props}
      initial={{ translateX: 30 }}
      animate={{ translateX: 0, transition: { duration: 0.2 } }}
      style={{ transform: 'translate3d(0, 0, 0)' }}
      whileHover={{
        scale: 1.15,
        transition: { duration: 0.15 },
      }}
      whileTap={{ scale: 0.6, translateY: -7, transition: { duration: 0.3 } }}
      end
    >
      {/* // onClick={onClick} className={className} style={style}> */}
      {props.children}
    </m.button>
  );
};

export const Box = ({ select, className, ...props }: AniProps) => {
  return (
    <m.div
      className={`${className} ${select && 'clicked'}`}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.1 },
      }}
      style={{ transform: 'translate3d(0, 0, 0)' }}
      whileTap={{ scale: 0.9 }}
      {...props}
    >
      {props.children}
    </m.div>
  );
};
