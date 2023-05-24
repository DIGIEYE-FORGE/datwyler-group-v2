import { Tab } from "../../../utils";
import { ReactComponent as DashBoardIcon } from "../../../assets/icons/dashboard.svg";
import { ReactComponent as MapIcon } from "../../../assets/icons/map.svg";
import { ReactComponent as InfoIcon } from "../../../assets/icons/info-rounded.svg";
import { ReactComponent as ListIcon } from "../../../assets/icons/list.svg";
import { ReactComponent as BoardIcon } from "../../../assets/icons/board.svg";
import { ReactComponent as OpenedbookIcon } from "../../../assets/icons/opened-book.svg";
import { ReactComponent as AdminIcon } from "../../../assets/icons/admin.svg";
import { ReactComponent as SettingsIcon } from "../../../assets/icons/setting.svg";
import { ReactComponent as SupportIcon } from "../../../assets/icons/support.svg";
import DashboardTab from "./dashboard";
import SupportTab from "./support";
import ReportsTab from "./reports";
import AlertsTab from "./alertes";
import GeographicalMapTab from "./geographical-map";
import { MdDeveloperMode } from "react-icons/md";
import SettingsTab from "./settings";
import AdminTab from "./admin";
import DevicesTab from "./devices";
const tabs: Tab[] = [
  {
    name: "dashboard",
    icon: <DashBoardIcon />,
    component: <DashboardTab />,
  },
  {
    name: "geographical map",
    icon: <MapIcon />,
    component: <GeographicalMapTab />,
  },
  {
    name: "Alerts",
    icon: <InfoIcon />,
    component: <AlertsTab />,
  },
  {
    name: "List of devices",
    icon: <ListIcon />,
    component: <DevicesTab />,
  },
  {
    name: "Reports",
    icon: <BoardIcon />,
    component: <ReportsTab />,
  },
  {
    name: "Admin user",
    icon: <AdminIcon />,
    component: <AdminTab />,
  },
  // {
  //   name: "Library",
  //   icon: <OpenedbookIcon />,
  //   component: <div className="w-full h-full">Library</div>,
  // },
  {
    name: "support",
    icon: <SupportIcon />,
    component: <SupportTab />,
  },
  {
    name: "Settings",
    icon: <SettingsIcon />,
    component: <SettingsTab />,
  },
  // {
  //   name: "dev",
  //   icon: <MdDeveloperMode />,
  //   component: <DevTab />,
  // },
];

export default tabs;
