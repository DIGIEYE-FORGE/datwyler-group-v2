import Lottie from "react-lottie";
import animationData from "./animation.json";
type Props = {
  width?: number;
  height?: number;
};
function Loader({ width = 400, height = 400 }: Props) {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      }}
      width={width}
      height={height}
    />
  );
}

export default Loader;
