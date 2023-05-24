import { useState } from "react";
import Button from "../button";

interface AccordionItem {
  title: React.ReactNode;
  content: React.ReactNode;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  activeIndex?: number;
}

function Accordion({ items, className, ...props }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div {...props} className={`flex flex-col ${className}`}>
      {items.map((item, index) => (
        <>
          <Button
            onClick={() => handleClick(index)}
            className="transition-colors duration-500"
            variant={index === activeIndex ? "contained" : "outlined"}
          >
            <span>{item.title}</span>
          </Button>
          <span
            className={`${
              index === activeIndex ? "text-sm px-4 py-2" : "text-[0] "
            } transition-[font-size,padding] duration-500 ease-in-out`}
          >
            {item.content}
          </span>
        </>
      ))}
    </div>
  );
}

export default Accordion;
