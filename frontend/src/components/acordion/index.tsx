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
  const [activeIndeces, setActiveIndeces] = useState<number[]>([]);

  const handleClick = (index: number) => {
    setActiveIndeces((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      }
      return [...prev, index];
    });
  };

  return (
    <div {...props} className={`flex flex-col ${className}`}>
      {items.map((item, index) => (
        <>
          <Button
            onClick={() => handleClick(index)}
            className="transition-colors duration-500"
            variant={activeIndeces.includes(index) ? "contained" : "outlined"}
          >
            <span>{item.title}</span>
          </Button>
          <span
            style={
              activeIndeces.includes(index)
                ? {
                    fontSize: 0,
                    lineHeight: 0,
                    padding: 0,
                    opacity: 0,
                  }
                : {
                    lineHeight: "1.5rem",
                    fontSize: "1rem",
                    padding: "0.5rem",
                    opacity: 1,
                  }
            }
            className={`transition-[font-size,padding,line-height] duration-500 ease`}
          >
            {item.content}
          </span>
        </>
      ))}
    </div>
  );
}

export default Accordion;
