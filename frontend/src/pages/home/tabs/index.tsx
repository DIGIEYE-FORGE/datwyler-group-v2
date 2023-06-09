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
    name: "alerts",
    icon: <InfoIcon />,
    component: <AlertsTab />,
  },
  {
    name: "devices",
    icon: <ListIcon />,
    component: <DevicesTab />,
  },
  {
    name: "reports",
    icon: <BoardIcon />,
    component: <ReportsTab />,
  },
  {
    name: "users",
    icon: <AdminIcon />,
    component: <AdminTab />,
  },
  {
    name: "licenses",
    icon: <KeyIcon />,
    component: <LicenseTab />,
  },
  {
    name: "tenants",
    icon: <TenantIcon />,
    component: <TenantsTab />,
  },
  {
    name: "support",
    icon: <SupportIcon />,
    component: <SupportTab />,
  },
  {
    name: "profile settings",
    icon: <SettingsIcon />,
    component: <ProfileTab />,
  },
];

export default tabs;
