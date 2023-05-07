import React from "react";
interface Props {
  children: React.ReactNode[] | React.ReactNode;
  index: number;
  duration?: string;
}
const SwipeableTabs = (props: Props) => {
  const children = React.Children.toArray(props.children);
  return (
    <div
      className="flex "
      style={{
        justifyContent: "center",
        alignItems: "center",
        overflowX: "visible",
        overflowY: "visible",
        width: "100%",
        height: "100%",
        position: "relative",
        perspective: "1000px",
        boxSizing: "border-box",
      }}
    >
      {children.map((dv: React.ReactNode, i: number) => {
        const traslateX = i === props.index ? 0 : i > props.index ? 100 : -100;
        const rotateY = i === props.index ? 0 : i > props.index ? 90 : -90;
        const zIndex = i === props.index ? 1 : 0;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              transform: `rotateY(${rotateY}deg) translate(${traslateX}%) `,
              transition: `transform ${props.duration || "0.5s"} ease`,
              transformStyle: "preserve-3d",
              zIndex,
            }}
          >
            {dv}
          </div>
        );
      })}
    </div>
  );
};

export default SwipeableTabs;
