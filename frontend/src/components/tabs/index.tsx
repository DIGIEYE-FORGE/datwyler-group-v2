import { motion } from "framer-motion";
import For from "../for";

interface TabsProps {
  className?: string;
  labels: (string | React.ReactNode)[];

  labelStyle?: React.CSSProperties;
  labelClassName?: string;
  activeClassName?: string;
  activeStyle?: React.CSSProperties;
  index: number;
  onChange: (index: number) => void;

  indicator?: boolean;
}

function Tabs({
  labels,
  index,
  onChange,
  indicator = true,
  ...props
}: TabsProps) {
  return (
    <div className={`relative  w-fit ${props.className}`}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${labels.length}, 1fr)`,
        }}
      >
        <For each={labels}>
          {(item, i) => (
            <div
              className={`px-2  py-1 cursor-pointer ${props.labelClassName} ${
                index === i && props.activeClassName
              }`}
              onClick={() => {
                onChange(i);
              }}
              style={{
                ...props.labelStyle,
                ...(index === i && props.activeStyle),
              }}
            >
              {item}
            </div>
          )}
        </For>
        {indicator !== false && (
          <motion.div
            className="absolute h-1  bottom-0 bg-primary rounded "
            animate={{
              x: index * 100 + "%",
              width: 100 / labels.length + "%",
            }}
          ></motion.div>
        )}
      </div>
    </div>
  );
}

export default Tabs;
