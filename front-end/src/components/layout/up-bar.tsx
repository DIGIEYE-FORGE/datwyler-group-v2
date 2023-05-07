import { ReactComponent as BellIcon } from "../../assets/icons/bell.svg";
import { ReactComponent as ArrowDownIcon } from "../../assets/icons/arrow-down.svg";
import { ReactComponent as FrIcon } from "../../assets/fr.svg";
import { ReactComponent as UsaIcon } from "../../assets/usa.svg";
import { ReactComponent as SaIcon } from "../../assets/sa.svg";
import Tooltip from "../tooltip";
import { AppContext } from "../../App";
import { useProvider } from "../provider";
import { toggleFullScreen } from "../../utils";
import Avatar from "../avatar";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
function UpBar() {
  const {
    user,
    setAccessToken,
    setRefreshToken,
    setRtl,
    setLoginState,
    authApi,
  } = useProvider<AppContext>();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { t, i18n } = useTranslation();
  const logout = () => {
    setAccessToken("");
    setRefreshToken("");
    authApi.logout();
    setLoginState("error");
  };
  const changeLang = (lang: "en" | "fr" | "ar") => {
    i18n.changeLanguage(lang);
    if (lang === "ar") {
      setRtl(true);
    }
    if (lang === "en" || lang === "fr") {
      setRtl(false);
    }
  };
  return (
    <div className="up-bar">
      <span className="mx-4">{t("title")}</span>
      <div
        className="toggle-full-screen"
        onClick={() => {
          setIsFullScreen(!isFullScreen);
          toggleFullScreen();
        }}
      >
        {isFullScreen ? <BsFullscreenExit /> : <BsFullscreen />}
      </div>
      <Tooltip>
        <div className="h-[2rem] flex items-center">
          {i18n.language === "en" && (
            <UsaIcon className="h-[2rem] w-[1.5rem] " />
          )}
          {i18n.language === "fr" && <FrIcon className="h-[2rem] w-[1.5rem]" />}
          {i18n.language === "ar" && <SaIcon className="h-[2rem] w-[1.5rem]" />}
        </div>
        <div className="bg-light rounded p-2 mt-5 shadow-lg flex flex-col gap-2 text-dark">
          <div
            className="rounded p-2 hover:bg-primary/10 active:bg-primary/20 flex justify-between items-center"
            onClick={() => {
              changeLang("en");
            }}
          >
            <span>english</span>
            <UsaIcon className="ml-2 h-[2rem] w-[1.5rem]" />
          </div>
          <div
            className="rounded p-2 hover:bg-primary/10 active:bg-primary/20 flex justify-between items-center"
            onClick={() => {
              changeLang("fr");
            }}
          >
            <span>français</span>
            <FrIcon className="ml-2 h-[2rem] w-[1.5rem]" />
          </div>
          {/* <div
            className="rounded p-2 hover:bg-primary/10 active:bg-primary/20 flex justify-between items-center"
            onClick={() => {
              changeLang("ar");
            }}
          >
            <span>العربية</span>
            <SaIcon className="ml-2 h-[2rem] w-[1.5rem]" />
          </div> */}
        </div>
      </Tooltip>
      <div className="notifacations">
        <BellIcon />
      </div>

      <Tooltip>
        <div className="user flex items-center gap-2">
          <Avatar user={user} className="w-[2rem]" />
          <div className="full-name">{`${user?.firstName} ${user?.lastName}`}</div>
          <ArrowDownIcon />
        </div>
        <div className="bg-light rounded p-2 mt-5 shadow-lg flex flex-col gap-2 text-dark">
          <div
            onClick={logout}
            className="rounded p-2 hover:bg-primary/10 active:bg-primary/20 whitespace-nowrap"
          >
            <span>log out</span>
            <BiLogOutCircle className="inline-block ml-2" />
          </div>
        </div>
      </Tooltip>
    </div>
  );
}

export default UpBar;
