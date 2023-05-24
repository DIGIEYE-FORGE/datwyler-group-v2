import { AppContext } from "../../App";
import { classNames } from "../../utils";
import { useProvider } from "../provider";
import { ReactComponent as DoubleArrowLeftIcon } from "../../assets/icons/double-arrow-left.svg";
import { ReactComponent as LogoName } from "../../assets/logo-name.svg";
import { ReactComponent as LogoNameColored } from "../../assets/logo-name-colored.svg";
import { ReactComponent as LogoShape } from "../../assets/logo-shape.svg";
import { ReactComponent as LogoShapeColored } from "../../assets/logo-shape-colored.svg";
import { ReactComponent as AbaLogo } from "../../assets/aba-logo.svg";

import tabs from "../../pages/home/tabs";
import { useMemo } from "react";

function SideBar() {
  const { activeTab, selectTab, theme, user } = useProvider<AppContext>();
  const role = useMemo<"ADMIN" | "USER">(() => {
    if (user?.tenants?.[0]) {
      const tenant: any = user?.tenants?.[0];
      if (tenant?.role === "ADMIN") return "ADMIN";
    }
    return "USER";
  }, [user]);
  return (
    <div className="side-bar">
      <div className="logo">
        {theme === "light" ? (
          <LogoShapeColored className=" logo-shape" />
        ) : (
          <LogoShape className=" logo-shape" />
        )}
        {theme === "light" ? (
          <LogoNameColored className="logo-name" />
        ) : (
          <LogoName className="logo-name" />
        )}
      </div>
      <div className="h-[1rem]"></div>
      {tabs
        .filter((tab) => tab.name !== "Admin user" || role === "ADMIN")
        .map((link, index) => {
          const isActive = activeTab === index;
          return (
            <div
              key={link.name}
              onClick={() => selectTab(index)}
              className={classNames("link ", {
                "hover:bg-primary/10 active:bg-bg-primary/10":
                  theme === "light",
                "hover:bg-light/10 active:bg-bg-light/10": theme !== "light",
                active: isActive,
              })}
            >
              <div className="icon ">{link.icon}</div>
              <div className="name">{link.name}</div>
            </div>
          );
        })}
      <span className="water-mark">
        <span>developed by</span>
        <AbaLogo />
      </span>
      <label htmlFor="toggle-side-bar" className="toggle">
        <DoubleArrowLeftIcon />
      </label>
    </div>
  );
}

export default SideBar;
