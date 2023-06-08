import { Tab } from "../../../utils";
import { ReactComponent as DashBoardIcon } from "../../../assets/icons/dashboard.svg";
import { ReactComponent as MapIcon } from "../../../assets/icons/map.svg";
import { ReactComponent as InfoIcon } from "../../../assets/icons/info-rounded.svg";
import { ReactComponent as ListIcon } from "../../../assets/icons/list.svg";
import { ReactComponent as BoardIcon } from "../../../assets/icons/board.svg";
import { ReactComponent as AdminIcon } from "../../../assets/icons/admin.svg";
import { ReactComponent as SettingsIcon } from "../../../assets/icons/setting.svg";
import { ReactComponent as SupportIcon } from "../../../assets/icons/support.svg";
import { ReactComponent as KeyIcon } from "../../../assets/key.svg";
import { ReactComponent as TenantIcon } from "../../../assets/tenant.svg";
import DashboardTab from "./dashboard";
import SupportTab from "./support";
import ReportsTab from "./reports";
import LicenseTab from "./license";
import AlertsTab from "./alertes";
import GeographicalMapTab from "./geographical-map";
import SettingsTab from "./settings";
import AdminTab from "./admin";
import DevicesTab from "./devices";
import TenantsTab from "./tenants";
import ProfileTab from "./profiles";
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
  {
    name: "License",
    icon: <KeyIcon />,
    component: <LicenseTab />,
  },
  {
    name: "Tenant",
    icon: <TenantIcon />,
    component: <TenantsTab />,
  },
  {
    name: "support",
    icon: <SupportIcon />,
    component: <SupportTab />,
  },
  // {
  //   name: "Settings",
  //   icon: <SettingsIcon />,
  //   component: <SettingsTab />,
  // },
  {
    name: "Profile settings",
    icon: <SettingsIcon />,
    component: <ProfileTab />,
  },
];

export default tabs;
