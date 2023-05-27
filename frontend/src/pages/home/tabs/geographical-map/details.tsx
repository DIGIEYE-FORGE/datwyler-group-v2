import React from "react";
import { AiOutlineUnorderedList, AiOutlineDoubleLeft } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { GeographicalMapTabContext } from ".";
import Button from "../../../../components/button";
import { useProvider } from "../../../../components/provider";
import Show from "../../../../components/show";
import SwipeableTabs from "../../../../components/swipeable-tabs";
import Tabs from "../../../../components/tabs";
import {
  Alert,
  classNames,
  strTake,
  stringify,
  toFixed,
} from "../../../../utils";
import GroupsList from "./groups-list";
import DataGrid, { Column } from "../../../../components/data-grid";
import { format } from "date-fns";
import { GiBattery25, GiLeak } from "react-icons/gi";
import {
  FaHandHoldingWater,
  FaTemperatureHigh,
  FaTemperatureLow,
  FaTint,
  FaTintSlash,
} from "react-icons/fa";
import Accordion from "../../../../components/acordion";
import For from "../../../../components/for";

type AlertType =
  | "low battery"
  | "high temperature"
  | "low temperature"
  | "low water level"
  | "water leak";

const alertsComponentMap: {
  [key in AlertType]: JSX.Element;
} = {
  "low battery": (
    <div className="flex items-center gap-2 text-gray-400">
      low battery <GiBattery25 />
    </div>
  ),
  "high temperature": (
    <div className="flex items-center gap-2 text-red-400">
      high temperature <FaTemperatureHigh />
    </div>
  ),
  "low temperature": (
    <div className="flex items-center gap-2 text-blue-400">
      low temperature <FaTemperatureLow />
    </div>
  ),
  "low water level": (
    <div className="flex items-center gap-2 text-yellow-500">
      low water level <FaHandHoldingWater />
    </div>
  ),
  "water leak": (
    <div className="flex items-center gap-2 text-red-400">
      water leak <GiLeak />
    </div>
  ),
};

function Group({ groupId }: { groupId?: number | null }) {
  const { groups, showList } = useProvider<GeographicalMapTabContext>();
  const group = groups.find((group) => group.id == groupId);
  const [tabIndex, setTabIndex] = React.useState(0);
  const columns: Column[] = [
    {
      label: "syteme",
      header: "Systeme",
      valueGetter: (row: Alert) => row.deviceName || row.device?.name,
    },
    {
      label: "type",
      header: "Alert Type",
      valueGetter(row: Alert) {
        return row.type;
      },
    },
    {
      label: "date",
      header: "Date",
      valueGetter: (row: Alert) =>
        format(new Date(row.updatedAt), "dd/MM/yyyy HH:mm"),
    },
  ];

  if (!group)
    return <div className="h-full w-full flex-center">group not found</div>;
  else
    return (
      <div
        className={classNames(
          "relative min-w-full overflow-y-auto flex flex-col transition-[right]",
          {
            "max-w-0 max-h-0": !showList,
          }
        )}
        style={{
          right: showList == 2 ? "100%" : 0,
        }}
      >
        <div className="border-b-2 border-b-dark/10 pl-4">
          <Tabs
            index={tabIndex}
            labels={["Details", "status", "Alerts"]}
            labelClassName="text-primary"
            onChange={(tabIndex) => {
              setTabIndex(tabIndex);
            }}
            indicator={false}
            activeClassName="bg-primary text-white"
            activeStyle={{
              borderRadius: "0.25rem 0.25rem 0 0",
            }}
          />
        </div>
        <SwipeableTabs index={tabIndex} className=" flex-1 w-full">
          <div className="h-full overflow-y-auto p-4 flex flex-col ">
            <div className="grid grid-cols-5 my-1">
              <div className="col-span-2 text-slate-600 dark:text-slate-300 capitalize">
                location:
              </div>
              <div className="col-span-3">{strTake(group.location, 50)}</div>
            </div>
            <div className="grid grid-cols-5 my-1">
              <div className="col-span-2 text-slate-600 dark:text-slate-300 capitalize">
                ip:
              </div>
              <div className="col-span-3">{strTake(group.ip, 50)}</div>
            </div>
            <div className="grid grid-cols-5 my-1">
              <div className="col-span-2 text-slate-600 dark:text-slate-300 capitalize">
                lat:
              </div>
              <div className="col-span-3">{toFixed(group.lat)}</div>
            </div>
            <div className="grid grid-cols-5 my-1">
              <div className="col-span-2 text-slate-600 dark:text-slate-300 capitalize">
                lng:
              </div>
              <div className="col-span-3">{toFixed(group.lat)}</div>
            </div>
            <div className="grid grid-cols-5 my-1">
              <div className="col-span-2 text-slate-600 dark:text-slate-300 capitalize">
                number of devices:
              </div>
              <div className="col-span-3">{toFixed(group.devices?.length)}</div>
            </div>
            <div className="grid grid-cols-5 my-1">
              <div className="col-span-2 text-slate-600 dark:text-slate-300 capitalize">
                unaknowledged alerts:
              </div>
              <div className="col-span-3">{toFixed(group.alerts?.length)}</div>
            </div>
            <div className="grid grid-cols-5 my-4">
              <div className="col-span-2 text-slate-600 dark:text-slate-300 capitalize">
                date:
              </div>
              <div className="col-span-3">{new Date().toISOString()}</div>
            </div>
            <a
              href={`http://${group.ip}`}
              target="_blank"
              className="block w-full mt-auto"
            >
              <Button className="mt-auto py-2 w-full">
                Access Remote Controller
              </Button>
            </a>
          </div>
          <div className="h-full overflow-y-auto p-4 flex flex-col">
            <Accordion
              items={(group?.devices || []).map((device) => ({
                title: strTake(device.name, 50),
                content: (
                  <div className="grid grid-cols-6">
                    <Show when={device.lastTelemetries?.length == 0}>
                      <div className="col-span-6  ">
                        no telemetries received yet
                      </div>
                    </Show>
                    <For each={device.lastTelemetries || []}>
                      {(telemetry) => (
                        <>
                          <div className="col-span-2">{telemetry.name}</div>
                          <div className="col-span-4">
                            {stringify(telemetry.value)}
                          </div>
                        </>
                      )}
                    </For>
                  </div>
                ),
              }))}
            />
          </div>
          <div className="h-full overflow-auto">
            <DataGrid
              className="table-fixed  w-full  text-left "
              headClassName="h-[4rem] bg-dark/5 dark:bg-light/5 text-[#697681] [&>*]:px-2 "
              rowClassName="h-[4rem] [&>*]:px-2 even:bg-dark/5 dark:even:bg-light/5 hover:bg-dark/10 dark:hover:bg-light/10"
              columns={columns}
              rows={group?.alerts || []}
              hideAction
            ></DataGrid>
          </div>
        </SwipeableTabs>
      </div>
    );
}
function DetailsHeader() {
  const { groups, selectedGroup, showList, setShowList, selectGroup } =
    useProvider<GeographicalMapTabContext>();
  return (
    <div className="flex w-full justify-between items-center ">
      <Show when={showList == 0}>
        <div
          className="w-[2rem] h-[2rem] m-[0.5rem] rounded-full cursor-pointer flex-center hover:bg-primary/5 active:bg-primary/10"
          onClick={() => {
            setShowList(1);
          }}
        >
          <AiOutlineUnorderedList className="text-xl " />
        </div>
      </Show>
      <Show when={showList == 1}>
        <div
          className="w-[2rem] h-[2rem] m-[0.5rem] rounded-full cursor-pointer flex-center hover:bg-primary/5 active:bg-primary/10"
          onClick={() => {
            setShowList(0);
          }}
        >
          <MdClose className="text-2xl" />
        </div>
      </Show>
      <Show when={showList == 2}>
        <div className="m-2">
          {groups.find((group) => group.id == selectedGroup)?.name}
        </div>
        <div
          className="w-[2rem] h-[2rem] m-[0.5rem] rounded-full cursor-pointer flex-center hover:bg-primary/5 active:bg-primary/10"
          onClick={() => {
            setShowList(1);
          }}
        >
          <AiOutlineDoubleLeft className="text-xl " />
        </div>
      </Show>
    </div>
  );
}

function Details() {
  const { selectedGroup, showList } = useProvider<GeographicalMapTabContext>();

  return (
    <div
      className="absolute top-[1rem] left-[1rem]    blur-background z-[400] shadow-lg rounded shadow-dark/25 overflow-hidden bg-light/10 dark:bg-primary-dark"
      style={{
        transition: "width 150ms, 150ms, background-color 1s",
        height: showList ? "calc(100% - 2rem)" : "3rem",
        width: (showList && (showList == 2 ? "40rem" : "20rem")) || "3rem",
      }}
    >
      <DetailsHeader />
      <div
        className={classNames(
          "flex  h-[calc(100%-3rem)] overflow-y-auto overflow-x-hidden    ",
          {
            "overflow-hidden ": !showList,
          }
        )}
      >
        <GroupsList />
        <Group groupId={selectedGroup} />
      </div>
    </div>
  );
}

export default Details;
