import React, { useMemo } from "react";
import { AppContext } from "../../App";
import Layout from "../../components/layout";
import { useProvider } from "../../components/provider";
import { Tab, classNames } from "../../utils";
import alltabs from "./tabs";
import { ReactComponent as XIcon } from "../../assets/icons/x.svg";
import Lottie from "react-lottie";
import animationData from "./no-tab-lottie.json";
import { useTranslation } from "react-i18next";

interface Props {
  children: React.ReactNode[] | React.ReactNode;
  index: number;
  duration?: string;
}
const SwipeableTabs = (props: Props) => {
  const children = React.Children.toArray(props.children);
  return (
    <div className="relative w-full h-full box-border">
      {children.map((dv: React.ReactNode, i: number) => {
        const style =
          i === props.index
            ? {
                opacity: 1,
                zIndex: 1,
              }
            : {
                opacity: 0,
                zIndex: 0,
              };
        return (
          <div className="absolute  w-full h-full" key={i} style={style}>
            {dv}
          </div>
        );
      })}
    </div>
  );
};

function HomePage() {
  const { t } = useTranslation();
  const { selectedTabs, activeTab, selectTab, closeTab, user } =
    useProvider<AppContext>();

  const tabs = useMemo<Tab[]>(() => {
    if (user?.tenants?.[0]) {
      const tenant: any = user?.tenants?.[0];
      if (tenant?.role === "ADMIN") return alltabs;
    }
    return alltabs.filter((tab) => tab.name !== "Admin user");
  }, [user]);

  function getIndex() {
    if (activeTab === null) return 0;
    const index = selectedTabs.indexOf(activeTab);
    if (index === -1) return 0;
    return index;
  }
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Layout>
      <div className=" flex-center flex-col ">
        <div className="w-full h-full pt-[3rem] ">
          <div className=" flex  items-end overflow-x-auto absolute h-[3rem] w-full top-0 z-10 px-4 hide-scrollbar ">
            {selectedTabs.map((tabIdx) => {
              return (
                <button
                  key={tabIdx}
                  className={classNames(`capitalize`, {
                    "tab-label stroke-dark": true,
                    active: activeTab === tabIdx,
                  })}
                  onClick={() => selectTab(tabIdx)}
                >
                  <span>{tabs[tabIdx].icon}</span>
                  <span>{t(tabs[tabIdx].name)}</span>
                  <span
                    className="close-tab"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tabIdx);
                    }}
                  >
                    <XIcon className="w-4 h-4" />
                  </span>
                </button>
              );
            })}
          </div>
          {selectedTabs.length > 0 ? (
            <SwipeableTabs index={getIndex()} duration="0.5s">
              {selectedTabs.map((tabIdx) => {
                return (
                  <div key={tabIdx} className="tab ">
                    {tabs[tabIdx].component}
                  </div>
                );
              })}
            </SwipeableTabs>
          ) : (
            <div className="flex-center  h-full gap-6 p-6 ">
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl md:text-4xl font-bold text-primary   uppercase">
                  <span className="text-accent mr-2">{t("No")}</span>
                  <span>{t("tab selected")}</span>
                </h1>
                <p className="mt-2 text-base md:text-2xl dark:text-light">
                  {t("please select a tab from the sidebar")}
                </p>
              </div>
              <div className="pointer-events-none">
                <Lottie options={defaultOptions} height={600} width={500} />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
