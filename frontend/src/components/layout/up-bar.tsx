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
import { useTranslation } from "react-i18next";
import { CgDarkMode } from "react-icons/cg";
import { RxMoon, RxSun } from "react-icons/rx";
import For from "../for";
import { te } from "date-fns/locale";
import { FaRegUser } from "react-icons/fa";
function UpBar() {
  const {
    user,
    setAccessToken,
    setRefreshToken,
    setRtl,
    setLoginState,
    authApi,
    theme,
    setTheme,
    selectTab,
    tenantId,
    setTenantId,
    setSelectedTabs,
  } = useProvider<AppContext>();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { t, i18n } = useTranslation();
  const logout = () => {
    setAccessToken("");
    setRefreshToken("");
    setSelectedTabs([0]);
    selectTab(0);
    authApi.logout();
    setLoginState("error");
  };
  const changeLang = (lang: "en" | "fr" | "ar") => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    if (lang === "ar") {
      setRtl(true);
    }
    if (lang === "en" || lang === "fr") {
      setRtl(false);
    }
  };
  return (
    <div className="up-bar ">
      <span className="mx-4">{t("title")}</span>
      <select
        className="bg-transparent min-w-[8rem] md:min-w-[10rem]"
        onChange={(e) => {
          console.log(typeof e.target.value);
          setTenantId(parseInt(e.target.value));
        }}
        value={tenantId}
      >
        <For each={user?.tenants || []}>
          {(tenant) => (
            <option
              value={tenant.id}
              className="bg-white dark:bg-primary-dark text-dark dark:text-light "
            >
              {tenant.name}
            </option>
          )}
        </For>
      </select>
      <div
        className="toggle-full-screen hidden md:flex"
        onClick={() => {
          setIsFullScreen(!isFullScreen);
          toggleFullScreen();
        }}
      >
        {isFullScreen ? <BsFullscreenExit /> : <BsFullscreen />}
      </div>
      <Tooltip className="flex">
        <div className="h-[2rem] flex items-center">
          {theme === "hybrid" && <CgDarkMode className="h-[2rem] w-[1.5rem]" />}
          {theme === "light" && <RxSun className="h-[2rem] w-[1.5rem] " />}
          {theme === "dark" && <RxMoon className="h-[2rem] w-[1.5rem]" />}
        </div>
        <div className="mt-5 card !shadow-lg p-2 flex flex-col gap-2 text-dark">
          <div
            className="rounded p-2 hover:bg-primary/10 active:bg-primary/20 flex justify-between items-center"
            onClick={() => {
              setTheme("hybrid");
            }}
          >
            <span>default</span>
            <CgDarkMode className="ml-2 h-[2rem] w-[1.5rem]" />
          </div>
          <div
            className="rounded p-2 hover:bg-primary/10 active:bg-primary/20 flex justify-between items-center"
            onClick={() => {
              setTheme("light");
            }}
          >
            <span>light</span>
            <RxSun className="ml-2 h-[2rem] w-[1.5rem]" />
          </div>
          <div
            className="rounded p-2 hover:bg-primary/10 active:bg-primary/20 flex justify-between items-center"
            onClick={() => {
              setTheme("dark");
            }}
          >
            <span>dark</span>
            <RxMoon className="ml-2 h-[2rem] w-[1.5rem]" />
          </div>
        </div>
      </Tooltip>
      <Tooltip className="flex">
        <div className="h-[2rem] flex items-center">
          {i18n.language === "en" && (
            <UsaIcon className="h-[2rem] w-[1.5rem] " />
          )}
          {i18n.language === "fr" && <FrIcon className="h-[2rem] w-[1.5rem]" />}
          {i18n.language === "ar" && <SaIcon className="h-[2rem] w-[1.5rem]" />}
        </div>
        <div className="card !shadow-lg p-2 mt-5 flex flex-col gap-2 text-dark">
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
        </div>
      </Tooltip>
      <div className="notifacations hidden md:flex">
        <BellIcon
          className={theme === "light" ? "fill-primary" : "fill-white"}
        />
      </div>

      <Tooltip className="flex">
        <div className="user flex items-center gap-2">
          <Avatar user={user} className="w-[2rem] text-light" />
          <div className="full-name hidden sm:flex">{`${user?.firstName} ${user?.lastName}`}</div>
          <ArrowDownIcon />
        </div>
        <div className="card !shadow-lg p-2 mt-5 flex flex-col gap-2 text-dark">
          <div
            onClick={logout}
            className="rounded p-2 hover:bg-primary/10 active:bg-primary/20 whitespace-nowrap"
          >
            <span>{t("logout")}</span>
            <BiLogOutCircle className="inline-block ml-2" />
          </div>
          <div
            onClick={() => {
              selectTab(9);
            }}
            className="rounded p-2 hover:bg-primary/10 active:bg-primary/20 whitespace-nowrap"
          >
            <span>Profile</span>
            <FaRegUser className="inline-block ml-2" />
          </div>
        </div>
      </Tooltip>
    </div>
  );
}

export default UpBar;
