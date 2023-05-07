import React from "react";
import Lottie from "react-lottie";
import animationData from "./animation.json";
type Props = {
  width?: number;
  height?: number;
};
function Error({ width = 400, height = 450 }: Props) {
  return (
    <div
      className="flex flex-col gap-4  w-fit mx-auto"
      style={{ width, height }}
    >
      <Lottie
        options={{
          loop: false,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        width={"100%"}
        height={"100%"}
      />
      <div className="text-2xl text-center text-dark/50">
        An error has occurred
      </div>
    </div>
  );
}

export default Error;
