import { AppContext } from "../../App";
import { useProvider } from "../provider";
import SideBar from "./side-bar";
import UpBar from "./up-bar";

function Layout({ children }: { children: React.ReactNode }) {
  const { rtl } = useProvider<AppContext>();
  return (
    <div
      className="layout"
      style={{
        direction: rtl ? "rtl" : "ltr",
      }}
    >
      <input type="checkbox" className="peer hidden" id="toggle-side-bar" />
      <UpBar />
      <SideBar />
      <div className="router-view">{children}</div>
    </div>
  );
}

export default Layout;
