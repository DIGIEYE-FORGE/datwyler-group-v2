import logo from "../../assets/images/logo.svg";
import frIcon from "../../assets/icons/flags/fr.svg";
import enIcon from "../../assets/icons/flags/us.svg";
import notificationIcon from "../../assets/icons/notification.svg";
import styled from "styled-components";
import Popover from "../popover";
import Button from "../button";
import Card from "../card";
import { useProvider } from "../provider";
import appsIcon from "../../assets/icons/apps.svg";
import HomeIcon from "../icons/home";
// import FireIcon from "../icons/fire";
// import CalenderIcon from "../icons/calender";
// import ChatIcon from "../icons/chat";
// import WatchIcon from "../icons/watch";
import SettingsIcon from "../icons/settings";
import { memo, useEffect, useState } from "react";
import Input from "../input";
import { useNavigate, useLocation } from "react-router-dom";
import FullScreen from "../../assets/icons/full-screen.svg";
import useLocalStorage from "../../hooks/use-local-storage";
import DigiAcLogo from "../../assets/images/digi-ac-logo.svg";
import DigiAiLogo from "../../assets/images/digi-ai-logo.svg";
import DigiAlprLogo from "../../assets/images/digi-alpr-logo.svg";
import DigiForgeLogo from "../../assets/images/digi-forge-logo.svg";
import DigiVmsLogo from "../../assets/images/digi-vms-logo.svg";
import DigiVmsAiLogo from "../../assets/images/digi-vms-ai-logo.svg";
import DigiWsLogo from "../../assets/images/digi-ws-logo.svg";
import DigiEnergyLogo from "../../assets/images/digi-energy-logo.svg";
import DigiCo2Logo from "../../assets/images/digi-co2-logo.svg";
import { UserContext } from "../../App";
import Select from "../select";
import SelectV2 from "../select-version2";

const XIcon = () => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="16"
      height="16"
      transform="translate(0 0.5)"
      fill="white"
      fillOpacity="0.01"
    />
    <g clipPath="url(#clip0_101_13157)">
      <rect
        width="14"
        height="14"
        transform="translate(1 1.5)"
        fill="white"
        fillOpacity="0.01"
      />
      <g clipPath="url(#clip1_101_13157)">
        <path
          d="M14.9996 8.49921C14.9996 10.3557 14.2621 12.1362 12.9494 13.449C11.6366 14.7617 9.85615 15.4992 7.99963 15.4992C6.14312 15.4992 4.36264 14.7617 3.04989 13.449C1.73713 12.1362 0.999634 10.3557 0.999634 8.49921C0.999634 6.64269 1.73713 4.86221 3.04989 3.54946C4.36264 2.2367 6.14312 1.49921 7.99963 1.49921C9.85615 1.49921 11.6366 2.2367 12.9494 3.54946C14.2621 4.86221 14.9996 6.64269 14.9996 8.49921ZM5.68438 5.56446C5.60223 5.48231 5.49081 5.43615 5.37463 5.43615C5.25845 5.43615 5.14703 5.48231 5.06488 5.56446C4.98273 5.64661 4.93658 5.75803 4.93658 5.87421C4.93658 5.99039 4.98273 6.10181 5.06488 6.18396L7.38101 8.49921L5.06488 10.8145C5.02421 10.8551 4.99194 10.9034 4.96993 10.9566C4.94791 11.0097 4.93658 11.0667 4.93658 11.1242C4.93658 11.1817 4.94791 11.2387 4.96993 11.2918C4.99194 11.345 5.02421 11.3933 5.06488 11.434C5.14703 11.5161 5.25845 11.5623 5.37463 11.5623C5.43216 11.5623 5.48912 11.5509 5.54227 11.5289C5.59542 11.5069 5.64371 11.4746 5.68438 11.434L7.99963 9.11783L10.3149 11.434C10.3556 11.4746 10.4039 11.5069 10.457 11.5289C10.5101 11.5509 10.5671 11.5623 10.6246 11.5623C10.6822 11.5623 10.7391 11.5509 10.7923 11.5289C10.8454 11.5069 10.8937 11.4746 10.9344 11.434C10.9751 11.3933 11.0073 11.345 11.0293 11.2918C11.0514 11.2387 11.0627 11.1817 11.0627 11.1242C11.0627 11.0667 11.0514 11.0097 11.0293 10.9566C11.0073 10.9034 10.9751 10.8551 10.9344 10.8145L8.61826 8.49921L10.9344 6.18396C10.9751 6.14328 11.0073 6.09499 11.0293 6.04184C11.0514 5.9887 11.0627 5.93173 11.0627 5.87421C11.0627 5.81668 11.0514 5.75972 11.0293 5.70657C11.0073 5.65342 10.9751 5.60513 10.9344 5.56446C10.8937 5.52378 10.8454 5.49151 10.7923 5.4695C10.7391 5.44748 10.6822 5.43615 10.6246 5.43615C10.5671 5.43615 10.5101 5.44748 10.457 5.4695C10.4039 5.49151 10.3556 5.52378 10.3149 5.56446L7.99963 7.88058L5.68438 5.56446Z"
          fill="#6C757D"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_101_13157">
        <rect
          width="14"
          height="14"
          fill="white"
          transform="translate(1 1.5)"
        />
      </clipPath>
      <clipPath id="clip1_101_13157">
        <rect
          width="14"
          height="14"
          fill="white"
          transform="translate(1 1.5)"
        />
      </clipPath>
    </defs>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.47332 3.52677C5.41084 3.58875 5.36124 3.66248 5.32739 3.74372C5.29355 3.82496 5.27612 3.91209 5.27612 4.0001C5.27612 4.08811 5.29355 4.17525 5.32739 4.25649C5.36124 4.33773 5.41084 4.41146 5.47332 4.47343L8.52665 7.52677C8.58913 7.58874 8.63873 7.66248 8.67258 7.74372C8.70642 7.82496 8.72385 7.91209 8.72385 8.0001C8.72385 8.08811 8.70642 8.17525 8.67258 8.25649C8.63873 8.33773 8.58913 8.41146 8.52665 8.47344L5.47332 11.5268C5.41084 11.5887 5.36124 11.6625 5.32739 11.7437C5.29355 11.825 5.27612 11.9121 5.27612 12.0001C5.27612 12.0881 5.29355 12.1752 5.32739 12.2565C5.36124 12.3377 5.41084 12.4115 5.47332 12.4734C5.59823 12.5976 5.7672 12.6673 5.94332 12.6673C6.11944 12.6673 6.28841 12.5976 6.41332 12.4734L9.47331 9.41344C9.84785 9.03843 10.0582 8.5301 10.0582 8.0001C10.0582 7.4701 9.84785 6.96177 9.47331 6.58677L6.41332 3.52677C6.28841 3.4026 6.11944 3.33291 5.94332 3.33291C5.7672 3.33291 5.59823 3.4026 5.47332 3.52677Z"
      fill="#4E5064"
    />
  </svg>
);

interface Theme {
  mode: "light" | "dark";
  palette: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
  light: {
    background: string;
    text: string;
  };
  dark: {
    background: string;
    text: string;
  };
}

const theme: Theme = {
  mode: "light",
  palette: {
    primary: "#07485E",
    secondary: "#F2F2F2",
    success: "#00BFA6",
    warning: "#FFC107",
    danger: "#F44336",
    info: "#2196F3",
  },
  light: {
    background: "#F5F5F5",
    text: "#07485E",
  },
  dark: {
    background: "#07485E",
    text: "#F2F2F2",
  },
};

interface Route {
  label: string;
  path?: string;
  icon?: React.ReactNode;
  description?: string;
  routes?: Route[];
}

interface Group {
  label: string;
  routes: Route[];
  icon?: React.ReactNode;
}

interface Props {
  groups: Group[];
  children: React.ReactNode;
}

const StyledLayout = styled.div`
  min-height: 100vh;
  height: 100%;
  background-color: ${({ theme }) => theme[theme.mode].background};
  padding-top: 70px;
  padding-left: 61px;
  overflow: auto;
  transition: padding-left 0.3s ease;
  &.sub-menu-open {
    padding-left: 277px;
  }
  .up-bar {
    z-index: 3;
    position: fixed;
    display: flex;
    align-items: center;
    padding: 0 18px;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: #fff;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.05);
    & > .logo {
      height: 2.5rem;
    }
  }
  .side-bar {
    position: fixed;
    top: 76px;
    bottom: 6px;
    left: 6px;
    z-index: 5;
    & > .main {
      position: absolute;
      z-index: 2;
      height: 100%;
      display: flex;
      gap: 6px;
      align-items: center;
      padding: 14px 0;
      flex-direction: column;
      width: 55px;
      background-color: ${(props) => props.theme.palette.primary};
      border-radius: 4px;

      & .icon {
        width: 60px;
      }
      & > .link {
        height: 34px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        cursor: pointer;

        &::before {
          content: "";
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          bottom: 0;
          left: 1px;
          width: 3px;
          height: 0;
          border-radius: 4px;
          background-color: #fff;
          opacity: 0;
          transition: height 0.5s ease, opacity 0.5s ease;
        }
        .icon-wrap {
          width: 34px;
          height: 34px;
          border-radius: 4px;
          svg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          path {
            fill: #fff;
          }
        }
        &:hover {
          &::before {
            content: "";
            height: 100%;
            opacity: 1;
          }
        }
        &.active {
          ::before {
            display: none;
          }
          .icon-wrap {
            background-color: #ffb557;
            animation: scale-up 0.5s ease;
            path {
              fill: ${(props) => props.theme.palette.primary};
            }
          }
        }
      }
    }
    & > .sub-menu {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 273px;
      max-width: 0;
      padding: 0px 0px 0px 55px;
      overflow: hidden;
      transition-duration: 0.3s;
      transition-timing-function: ease;
      transition-property: max-width;
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.05);
      background-color: #edeef0;
      border-radius: 4px;
      &.open {
        padding: 3px 3px 3px 58px;
        left: -3px;
        top: -3px;
        bottom: -3px;
        max-width: 300px;
        box-shadow: 2px 0px 6px rgba(0, 0, 0, 0.1);
      }
      .content {
        width: 215px;
        min-width: 215px;
        padding: 1rem 0.5rem;
        display: flex;
        flex-direction: column;
        .title {
          text-transform: capitalize;
          color: #3f4570;
          font-weight: 600;
          font-size: 16px;
        }
        .router-link {
          display: flex;
          height: 2rem;
          cursor: pointer;
          align-items: center;
          gap: 10px;
          & > .icon {
            height: 100%;
            width: 1.5rem;
            display: flex;
            align-items: center;
          }
          & > .label {
            flex-grow: 1;
            font-size: 14px;
            text-transform: capitalize;
          }
        }
        .sub-routes {
          position: relative;
          overflow: hidden;
          transition: max-height 0.3s ease;
          .label {
            color: #9497a7;
          }
          &::before {
            content: "";
            position: absolute;
            top: 4px;
            bottom: 4px;
            left: 12px;
            width: 2px;
            background-color: #e6e6ef;
          }
        }
      }
    }
  }

  @keyframes scale-up {
    0% {
      width: 0;
      height: 0;
      border-radius: 20px;
    }
  }
  .text-primary {
    color: ${(props) => props.theme.palette.primary};
  }
  .text-success {
    color: ${(props) => props.theme.palette.success};
  }
  .text-danger {
    color: ${(props) => props.theme.palette.danger};
  }
  .text-warning {
    color: ${(props) => props.theme.palette.warning};
  }
  .text-info {
    color: ${(props) => props.theme.palette.info};
  }

  .bg-primary {
    background-color: ${(props) => props.theme.palette.primary};
  }
  .bg-success {
    background-color: ${(props) => props.theme.palette.success};
  }
  .bg-danger {
    background-color: ${(props) => props.theme.palette.danger};
  }
  .bg-warning {
    background-color: ${(props) => props.theme.palette.warning};
  }
  .bg-info {
    background-color: ${(props) => props.theme.palette.info};
  }

  .outline-primary {
    border: 1px solid ${(props) => props.theme.palette.primary};
  }
  .outline-success {
    border: 1px solid ${(props) => props.theme.palette.success};
  }
  .outline-danger {
    border: 1px solid ${(props) => props.theme.palette.danger};
  }
  .outline-warning {
    border: 1px solid ${(props) => props.theme.palette.warning};
  }
  .outline-info {
    border: 1px solid ${(props) => props.theme.palette.info};
  }
  .app {
    margin: "1em 6px";
  }
`;

StyledLayout.defaultProps = {
  theme,
};

interface Context {
  lang: ["en" | "fr", React.Dispatch<React.SetStateAction<"en" | "fr">>];
}
const Layout = (props: Props) => {
  const [login, setLogin] = useLocalStorage("login", false);

  const context = useProvider<Context & UserContext>();
  const [user, setUser] = context.user;
  const [tenantSelected, setTenantSelected] = context.tenantSelected;
  const [subMenuOpen, setSubMenuOpen] = useState<boolean>(false);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [lang, setLang] = context.lang;

  return (
    <StyledLayout className={`${subMenuOpen && "sub-menu-open"}`}>
      <div className="up-bar">
        <img className="logo" src={logo} alt="logo" />
        <span className="ml-auto"></span>
        <Button
          variant="text"
          className="h-3"
          onClick={() => {
            if (fullScreen) {
              document.exitFullscreen();
              setFullScreen(false);
            } else {
              document.documentElement.requestFullscreen();
              setFullScreen(true);
            }
          }}
        >
          <img width={26} src={FullScreen} alt="user" />
        </Button>
        <Popover>
          <Button variant="text" className="h-3">
            {<img width={26} src={lang === "en" ? enIcon : frIcon} alt="fr" />}
          </Button>
          <div className="flex flex-col py-2 px-1">
            <Button
              close
              variant="text"
              className="flex align-center gap-4 p-3 h-3"
              onClick={() => {
                setLang("en");
              }}
            >
              <img src={enIcon} alt="en" />
              <span>english</span>
            </Button>
            <Button
              close
              variant="text"
              className="flex align-center gap-4 p-3 h-3"
              onClick={() => {
                setLang("fr");
              }}
            >
              <img src={frIcon} alt="fr" /> <span>francais</span>
            </Button>
          </div>
        </Popover>
        <Popover>
          <Button variant="text" className="h-3">
            <img src={notificationIcon} alt="notification" />
          </Button>
          <div className="flex flex-col py-2 px-1">notification</div>
        </Popover>
        <Popover>
          <Button variant="text" className="h-3">
            {user && user.firstName && user.lastName
              ? user.firstName + " " + user.lastName
              : "user"}
          </Button>
          <Card className="flex flex-col py-2 px-1">
            <Button
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/login");
              }}
              close
              variant="text"
              className="w-8"
            >
              logout
            </Button>
          </Card>
        </Popover>
      </div>
      <div className="side-bar">
        <div className="main ">
          <Popover>
            <img width={24} src={appsIcon} alt="apps" />
            <div className="relative">
              <Card
                className="absolute shadow-xl  grid-3"
                style={{
                  width: "348px",
                  maxHeight: "438px",
                  padding: "20px",
                  gap: "30px 10px",
                }}
              >
                <Button
                  variant="text"
                  close
                  className="app flex flex-col align-center g-4"
                >
                  <img src={DigiAiLogo} alt="digi-ac" />
                  <span>Digi AI</span>
                </Button>
                <Button
                  variant="text"
                  close
                  className="app flex flex-col align-center g-4"
                >
                  <img src={DigiAcLogo} alt="digi-ac" />
                  <span>Digi AC</span>
                </Button>
                <Button
                  variant="text"
                  close
                  className="app flex flex-col align-center g-4"
                >
                  <img src={DigiAlprLogo} alt="digi-ac" />
                  <span>Digi ALPR</span>
                </Button>
                <Button
                  variant="text"
                  close
                  className="app flex flex-col align-center g-4"
                  style={{
                    backgroundColor: "#EBF2FF",
                  }}
                >
                  <img src={DigiForgeLogo} alt="digi-ac" />
                  <span>Digi FORGE</span>
                </Button>
                <Button
                  variant="text"
                  close
                  className="app flex flex-col align-center g-4"
                >
                  <img src={DigiVmsLogo} alt="digi-ac" />
                  <span>Digi VMS</span>
                </Button>
                <Button
                  variant="text"
                  close
                  className="app flex flex-col align-center g-4"
                >
                  <img src={DigiVmsAiLogo} alt="digi-ac" />
                  <span>Digi WS IA</span>
                </Button>
                <Button
                  variant="text"
                  close
                  className="app flex flex-col align-center g-4"
                >
                  <img src={DigiWsLogo} alt="digi-ac" />
                  <span>Digi WS</span>
                </Button>
                <Button
                  variant="text"
                  close
                  className="app flex flex-col align-center g-4"
                >
                  <img src={DigiEnergyLogo} alt="digi-ac" />
                  <span>Digi Energy </span>
                </Button>
                <Button
                  variant="text"
                  close
                  className="app flex flex-col align-center g-4"
                >
                  <img src={DigiCo2Logo} alt="digi-ac" />
                  <span>Digi CO2</span>
                </Button>
              </Card>
            </div>
          </Popover>
          <span className="mt-auto "></span>
          <div
            className="link active "
            onClick={(e) => {
              setSubMenuOpen((curr) => !curr);
            }}
          >
            <span className="icon-wrap">
              <HomeIcon color="white" />
            </span>
          </div>
          {/* <div className="link">
            <span
              className="icon-wrap"
              onClick={() => {
                navigate("/dev");
              }}
            >
              <FireIcon color="white" />
            </span>
          </div> */}
          {/* <div className="link">
            <span className="icon-wrap">
              <CalenderIcon color="white" />
            </span>
          </div>
          <div className="link">
            <span className="icon-wrap">
              <ChatIcon />
            </span>
          </div>
          <div className="link">
            <span className="icon-wrap">
              <WatchIcon />
            </span>
          </div>
          */}
          <div className="link">
            <span className="icon-wrap">
              <SettingsIcon />
            </span>
          </div>
          <div className="seceondary-menu"></div>
        </div>
        <div className={`sub-menu ${subMenuOpen && "open"}`}>
          <div className="content ">
            <div className="title">gestion device</div>
            <Select
              className="mt-6"
              value={tenantSelected
                ? tenantSelected
                : user && user?.tenants?.[0]?.id || -1}
              onChange={(e:any) => {
                setTenantSelected(+e.target.value);
                localStorage.setItem("tenantId", e.target.value);
              }}
            >
              <option value={""} disabled>
                select tenant
              </option>
              {user &&
                user.tenants &&
                user.tenants.length > 0 &&
                user.tenants.map((ele: any) => {
                  return (
                    <option key={ele.id + "tenant"} value={ele.id}>
                      {ele.name}
                    </option>
                  );
                })}
            </Select>
            <span className="mt-6"></span>
            {props.groups[0].routes.map((route) => {
              return <RouterLink key={route.label} route={route} />;
            })}
          </div>
        </div>
      </div>
      {props.children}
    </StyledLayout>
  );
};

interface RouterLinkProps {
  route: Route;
}
function RouterLink(props: RouterLinkProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive =
    location.pathname === props.route.path ||
    props.route.routes?.some((route) => route.path === location.pathname) ||
    false;
  const [open, setOpen] = useState<boolean>(isActive);
  const { route } = props;
  const { label, path, icon } = route;
  return (
    <div>
      <div
        className="router-link "
        onClick={(e) => {
          if (path) {
            navigate(path);
          } else {
            setOpen((curr) => !curr);
          }
        }}
      >
        <span className="icon">{icon}</span>
        <span
          className="label"
          style={{
            color: isActive ? "#4E5064" : "",
            fontWeight: location.pathname === path ? "600" : "",
          }}
        >
          {label}
        </span>
        {route.routes && route.routes.length > 0 && (
          <span
            style={{
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          >
            <ArrowLeftIcon />
          </span>
        )}
      </div>
      <div
        className="sub-routes"
        style={{
          maxHeight: open ? (route.routes?.length || 0) * 40 : 0,
        }}
      >
        {route.routes?.map((route) => {
          return <RouterLink key={route.label} route={route} />;
        })}
      </div>
    </div>
  );
}

export { type Route, type Group, type Theme };
export default memo(Layout);
