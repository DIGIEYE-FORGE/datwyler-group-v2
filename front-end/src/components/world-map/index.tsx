import { motion } from "framer-motion";
import { useState, useDeferredValue, useEffect, memo } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";
import { ReactComponent as WorldMapSvg } from "../../assets/world.svg";

function WroldMap() {
  const [id, setId] = useState<string | null>(null);
  const [scale, setScale] = useState(1.2);
  const deferredScale = useDeferredValue(scale);
  const { t } = useTranslation();

  const scaleDown = () => {
    setScale((prev) => {
      if (prev <= 0.5) return prev;
      return prev * 0.9;
    });
  };
  const scaleUp = () => {
    setScale((prev) => {
      if (prev >= 4) return prev;
      return prev * 1.1;
    });
  };

  useEffect(() => {
    const map = document.getElementById("world-map");
    const mapContainer = document.getElementById("world-map-container");
    const tooltip = document.getElementById("country-tooltip");
    if (map && tooltip && mapContainer && map.children) {
      [...map.children].forEach((child) => {
        child.addEventListener("mousemove", (e) => {
          const { clientX, clientY } = e as any as MouseEvent;
          const mapRect = mapContainer.getBoundingClientRect();

          const x = clientX - mapRect.left;
          const y = clientY - mapRect.top;

          tooltip.style.top = `${y}px`;
          tooltip.style.left = `${x}px`;
          setId(child.attributes.getNamedItem("title")?.value || child.id);
        });
        child.addEventListener("mouseleave", (e) => {
          setId(null);
        });
      });
    }
  }, []);

  return (
    <div
      className="bg-light shadow-lg shadow-dark/5 rounded-lgw-full h-full overflow-hidden relative flex-center "
      id="world-map-container"
    >
      <motion.div
        drag
        dragMomentum={false}
        className="w-fit h-fit "
        style={{
          scale: deferredScale,
        }}
      >
        <WorldMapSvg
          id="world-map"
          className={` [&>*]:fill-dark/30 [&>*:hover]:fill-accent  [&>*]:transition-colors [&>#SA]:fill-primary [&>#AE]:fill-primary  stroke-light cursor-grab  `}
        />
      </motion.div>
      <div className="absolute  bottom-[1rem] right-[1rem]  flex flex-col  [&>*]:w-[2rem] [&>*]:aspect-square bg-dark/50 text-white blur-background [&>*:hover]:cursor-pointer [&>*:hover]:shadow-md [&>*]:flex [&>*]:justify-center [&>*]:items-center [&>*:hover]:bg-dark/10 shadow-lg rounded overflow-hidden  ">
        <div
          onClick={() => {
            scaleUp();
          }}
        >
          <BsPlusCircle />
        </div>
        <div
          onClick={() => {
            scaleDown();
          }}
        >
          <AiOutlineMinusCircle />
        </div>
      </div>
      <div
        className="pointer-events-none  absolute -translate-x-1/2 translate-y-[-120%] p-1  flex-center rounded  bg-dark/75 text-light"
        id="country-tooltip"
        style={{
          visibility: id ? "visible" : "hidden",
        }}
      >
        {t(id || "")}
      </div>
    </div>
  );
}

export default memo(WroldMap);
