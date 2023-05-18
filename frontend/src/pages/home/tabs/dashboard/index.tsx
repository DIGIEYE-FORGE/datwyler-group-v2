import { useRef, useState } from "react";
import { BsAlarm, BsCpu, BsDoorClosedFill } from "react-icons/bs";
import { TbBellRinging } from "react-icons/tb";
import { GiLeak } from "react-icons/gi";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import Tooltip from "../../../../components/tooltip";

import ReactApexChart from "react-apexcharts";
import For from "../../../../components/for";
import { MapContainer, Marker, TileLayer, ZoomControl } from "react-leaflet";
import greenMarkerUrl from "../../../../assets/icons/green-marker.svg";
import redMarkerUrl from "../../../../assets/icons/red-marker.svg";
import { generateGroups } from "../geographical-map/dummyData";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import Card from "../../../../components/card";
import { GiSmokeBomb } from "react-icons/gi";
import { useProvider } from "../../../../components/provider";
import { AppContext } from "../../../../App";

interface IconButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  tooltip?: string;
}

export function IconButton({ children, className, ...props }: IconButtonProps) {
  if (props.tooltip) {
    return (
      <Tooltip>
        <button
          {...props}
          className={`aspect-square rounded-full p-2 hover:bg-dark/5 active:bg-dark/10 ${className}`}
        >
          {children}
        </button>
        <div className="bg-dark/75 text-light px-2 py-1 rounded-full whitespace-nowrap">
          {props.tooltip}
        </div>
      </Tooltip>
    );
  }
  return (
    <button
      {...props}
      className={`aspect-square rounded-full p-2 hover:bg-dark/5 active:bg-dark/10 ${className}`}
    >
      {children}
    </button>
  );
}

function Metrics() {
  return (
    <div className="w-full flex gap-6 flex-wrap">
      <Card className="metric-card ">
        <div className="title rounded bg-primary/10  p-2">Online devices</div>
        <div className="flex-1 flex justify-between items-center p-2 ">
          <span className="text-3xl">178</span>
          <span className="w-[2.75rem] aspect-square flex-center bg-primary/20 rounded-full">
            <BsCpu className="text-primary" fontSize={24} />
          </span>
        </div>
      </Card>
      <Card className="metric-card ">
        <div className="title rounded bg-primary/10 p-2"> Critical Alarms</div>
        <div className="flex-1 flex justify-between items-center p-2 ">
          <span className="text-3xl">178</span>
          <span className="w-[2.75rem] aspect-square flex-center bg-accent/20 rounded-full">
            <BsAlarm className="text-accent" fontSize={24} />
          </span>
        </div>
      </Card>
      <Card className="metric-card ">
        <div className="title rounded bg-primary/10 p-2">Door Status</div>
        <div className="flex-1 flex justify-between items-center p-2 ">
          <span className="text-3xl">178</span>
          <span className="w-[2.75rem] aspect-square flex-center bg-[#F86F28]/20 rounded-full">
            <BsDoorClosedFill color="#F86F28" fontSize={24} />
          </span>
        </div>
      </Card>
      <Card className="metric-card ">
        <div className="title rounded bg-primary/10 p-2">Water leakage</div>
        <div className="flex-1 flex justify-between items-center p-2 ">
          <span className="text-3xl">178</span>
          <span className="w-[2.75rem] aspect-square flex-center bg-blue-500/20 rounded-full">
            <GiLeak className="text-blue-500" fontSize={24} />
          </span>
        </div>
      </Card>
      <Card className="metric-card ">
        <div className="title rounded bg-primary/10 p-2">Smoke</div>
        <div className="flex-1 flex justify-between items-center p-2 ">
          <span className="text-3xl">178</span>
          <span className="w-[2.75rem] aspect-square flex-center bg-gray-500/20 rounded-full">
            <GiSmokeBomb className="text-gray-600" fontSize={24} />
          </span>
        </div>
      </Card>
    </div>
  );
}

function Chart({
  children,
  title,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [isChartFullscreen, setIsChartFullscreen] = useState(false);
  const { theme } = useProvider<AppContext>();
  const alarmsRef = useRef<HTMLDivElement>(null);

  const chartFullscreen = () => {
    if (window.document.fullscreenElement === alarmsRef.current) {
      window.document.exitFullscreen();
      setIsChartFullscreen(false);
      return;
    }
    if (alarmsRef.current) {
      alarmsRef.current.requestFullscreen();
      setIsChartFullscreen(true);
    }
  };
  return (
    <div
      className={`card flex flex-col min-h-[23.5rem] max-h-[23.5rem] ${className}`}
      ref={alarmsRef}
    >
      <div className="card-header">
        <span>{title}</span>
        <span className="options">
          <IconButton onClick={chartFullscreen}>
            {isChartFullscreen ? (
              <BsFullscreenExit
                fontSize={20}
                className="dark:text-white text-black"
              />
            ) : (
              <BsFullscreen
                fontSize={20}
                className="dark:text-white text-black"
              />
            )}
          </IconButton>
          <IconButton className="hidden">
            <FiSettings fontSize={20} />
          </IconButton>
        </span>
      </div>
      {children}
    </div>
  );
}

function GeographicalMap() {
  const [groups, setGroups] = useState(generateGroups(10));

  return (
    <Chart
      title="Geographical map "
      className="xl:col-span-2  w-full overflow-x-hidden "
    >
      <div className="card-body text-dark  relative  h-[calc(100%-4rem)] w-full  ">
        <MapContainer
          center={[25.2048, 55.2708]}
          zoom={2}
          // minZoom={}
          attributionControl={false}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomright" />
          <MarkerClusterGroup>
            <For each={groups}>
              {(group) => (
                <Marker
                  position={[
                    group.attributes?.lat || 0,
                    group.attributes?.lng || 0,
                  ]}
                  icon={
                    new L.Icon({
                      iconUrl: group.attributes?.alerts
                        ? redMarkerUrl
                        : greenMarkerUrl,
                      iconSize: [30, 30],
                      iconAnchor: [15, 15],
                    })
                  }
                ></Marker>
              )}
            </For>
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </Chart>
  );
}
const alerts = [
  {
    id: 1,
    name: "Device 1",
    data: "2021-05-01",
    time: "12:00",
  },
  {
    id: 2,
    name: "Device 2",
    data: "2021-05-01",
    time: "12:00",
  },
  {
    id: 3,
    name: "Device 3",
    data: "2021-05-01",
    time: "12:00",
  },
  {
    id: 4,
    name: "Device 4",
    data: "2021-05-01",
    time: "12:00",
  },
  {
    id: 5,
    name: "Device 5",
    data: "2021-05-01",
    time: "12:00",
  },
  {
    id: 6,
    name: "Device 6",
    data: "2021-05-01",
    time: "12:00",
  },
  {
    id: 7,
    name: "Device 7",
    data: "2021-05-01",
    time: "12:00",
  },
];
function RecentAlarms() {
  return (
    <Chart title="UPS" className="flex h-full">
      <div className="flex gap-3 debug h-[calc(100%-3rem)] p-3">
        <div className="flex-1 flex justify-center items-center h-full">
          <div className="!w-5/6 aspect-square rounded-full  outline outline-8 outline-primary mx-auto my-auto relative">
            <div className="absolute-center flex flex-col items-center">
              <div className="text-5xl text-black dark:text-white">
                {alerts.length}
              </div>
              <div className="font-xl text-[#00323C]">Alarm</div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2  overflow-auto">
          <For each={alerts}>
            {(alert) => (
              <div className="flex items-center gap-2 p-2 shadow-inner">
                <div className="w-[2.75rem] aspect-square flex-center bg-[#F86F28]/20 rounded-full">
                  <TbBellRinging color="#F86F28" fontSize={24} />
                </div>
                <div className="w-[100%] p-1">
                  <span className="text-xl"> {alert.name}</span>
                  <div className="flex justify-between">
                    <span>{alert.data}</span>
                    <span>{alert.time}</span>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </Chart>
  );
}

function WaterFlow() {
  return (
    <Chart title="COOLING">
      <div className="card-body  overflow-auto flex flex-col mt-2 px-2">
        <div className="h-[10%] ml-auto">
          <input
            type="date"
            name="data"
            id="data"
            className="w-[20rem] border-2 border-primary"
          />
        </div>
        <div className="flex-1 flex">
          <div className="w-[70%]">
            <ReactApexChart
              width={"100%"}
              height={"100%"}
              type="donut"
              options={{
                chart: {
                  type: "donut",
                  id: "donut-basic",
                },
                legend: {
                  show: false,
                },
                colors: ["#0091AE", "#a1a5a5", "#97deed", "#e7ebeb"],
                plotOptions: {
                  pie: {
                    donut: {
                      size: "60%",
                      labels: {
                        show: true,
                        name: {
                          show: true,
                          fontSize: "22px",
                          fontFamily: "Helvetica, Arial, sans-serif",
                          fontWeight: 600,
                          color: "#373d3f",
                          offsetY: -10,
                        },
                        value: {
                          show: false,
                        },
                      },
                    },
                  },
                },
              }}
              series={[20, 20, 10, 2]}
              labels={["A", "B", "C"]}
              datalabels={{
                enabled: true,
                formatter: function (val: any) {
                  return val + "";
                },
                style: {
                  colors: ["#ba2323"],
                },
              }}
            />
          </div>
          <div className="flex-1 flex flex-col p-5 gap-4 w-[30%]">
            <div className="flex gap-2">
              <span
                className={`w-[4px] rounded-sm h-[3rem] bg-[#0091AE]`}
              ></span>
              <div className="flex flex-1 flex-col">
                <div className="font-bold">20</div>
                <div className="font-normal">Leak detected</div>
              </div>
            </div>
            <div className="flex gap-2">
              <span
                className={`w-[4px] rounded-sm h-[3rem] bg-[#a1a5a5]`}
              ></span>
              <div className="flex flex-1 flex-col">
                <div className="font-bold">20</div>
                <div className="font-normal">Continuous flow</div>
              </div>
            </div>
            <div className="flex gap-2">
              <span
                className={`w-[4px] rounded-sm h-[3rem] bg-[#97deed]`}
              ></span>
              <div className="flex flex-1 flex-col">
                <div className="font-bold">10</div>
                <div className="font-normal">Backflow</div>
              </div>
            </div>
            <div className="flex gap-2">
              <span
                className={`w-[4px] rounded-sm h-[3rem] bg-[#e7ebeb]`}
              ></span>
              <div className="flex flex-1 flex-col">
                <div className="font-bold">2</div>
                <div className="font-normal">No recent flow</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Chart>
  );
}

function Overview() {
  const { theme } = useProvider<AppContext>();
  return (
    <Chart title="Tempurature And Humidity" className="xl:col-span-2">
      <div className="card-body  overflow-auto p-3">
        <div className="h-[15%] flex justify-between p-3">
          <div></div>
          <input
            type="date"
            name="data"
            id="data"
            className="w-[20rem] border-2 border-primary"
          />
        </div>
        <ReactApexChart
          width={"100%"}
          height={"80%"}
          options={{
            chart: {
              id: "basic-bar",
              zoom: {
                enabled: false,
              },
              stacked: true,
              toolbar: {
                show: false,
              },
            },
            legend: {
              position: "top",
              horizontalAlign: "left",
              offsetY: -25,
              offsetX: -5,
              fontSize: "20px",
              labels: {
                colors: theme === "dark" ? "#fff" : "#373d3f",
              },
            },
            stroke: {
              width: [5, 6],
              curve: "smooth",
              dashArray: [0, 8],
            },
            tooltip: {
              enabled: false,
            },

            yaxis: {
              labels: {
                style: {
                  colors: theme === "dark" ? "#fff" : "#373d3f",
                  fontSize: "12px",
                },
              },
            },

            xaxis: {
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              labels: {
                style: {
                  colors: theme === "dark" ? "#fff" : "#373d3f",
                  fontSize: "12px",
                },
              },
            },
          }}
          series={[
            {
              data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 91, 80, 91],
              color: "#0091AE",
              name: "Humidity",
            },
            {
              data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
              color: "#EE3124",
              name: "Temperature",
            },
          ]}
        />
      </div>
    </Chart>
  );
}

function DashboardTab() {
  return (
    <div className="container items-center w-full min-h-full flex flex-col gap-6 overflow-x-hidden p-6 ">
      <Metrics />
      <div className="w-full h-full  grid xl:grid-cols-3 gap-4 auto-rows-fr">
        <RecentAlarms />
        <GeographicalMap />
        {/* <WaterFlow />
        <Overview /> */}
      </div>
    </div>
  );
}

export default DashboardTab;
