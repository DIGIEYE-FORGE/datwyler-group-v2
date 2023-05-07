import React from "react";
import For from "../for";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}
const SwipeableTabs = ({ index, className, children }: Props) => {
  const tabs = React.Children.toArray(children);
  return (
    <div className={`relative  overflow-hidden ${className}`}>
      <For each={tabs}>
        {(tab, i) => {
          const traslateX = i === index ? 0 : i > index ? 100 : -100;
          return (
            <div
              className="w-full h-full absolute transition-[transform]"
              key={i}
              style={{
                transform: ` translate(${traslateX}%) `,
              }}
            >
              {tab}
            </div>
          );
        }}
      </For>
    </div>
  );
};

export default SwipeableTabs;
