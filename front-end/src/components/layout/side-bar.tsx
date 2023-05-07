import { AppContext } from "../../App";
import { classNames } from "../../utils";
import { useProvider } from "../provider";
import { ReactComponent as DoubleArrowLeftIcon } from "../../assets/icons/double-arrow-left.svg";
import { ReactComponent as LogoName } from "../../assets/logo-name.svg";
import { ReactComponent as LogoShape } from "../../assets/logo-shape.svg";
import tabs from "../../pages/home/tabs";

function SideBar() {
  const { activeTab, selectTab } = useProvider<AppContext>();
  return (
    <div className="side-bar">
      <div className="logo">
        <LogoShape className=" logo-shape" />
        <LogoName className="logo-name" />
      </div>
      <div className="h-[1rem]"></div>
      {tabs.map((link, index) => {
        const isActive = activeTab === index;
        return (
          <div
            key={link.name}
            onClick={() => selectTab(index)}
            className={classNames("link", {
              "hover:bg-[#00323B] active:bg-[#00323B]": !isActive,
              active: isActive,
            })}
          >
            <div className="icon ">{link.icon}</div>
            <div className="name">{link.name}</div>
          </div>
        );
      })}
      <label htmlFor="toggle-side-bar" className="toggle">
        <DoubleArrowLeftIcon />
      </label>
    </div>
  );
}

export default SideBar;
