import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
  useMap,
} from "react-leaflet";
import For from "../../../../components/for";
import { ReactComponent as DoorAlertIcon } from "../../../../assets/icons/door-alert.svg";
import { ReactComponent as LeakAlertIcon } from "../../../../assets/icons/lock-alert.svg";
import { ReactComponent as LockAlertIcon } from "../../../../assets/icons/leak-alert.svg";
import { ReactComponent as PowerAlertIcon } from "../../../../assets/icons/fire-alert.svg";
import { ReactComponent as FireAlertIcon } from "../../../../assets/icons/power-alert.svg";
import greenMarkerUrl from "../../../../assets/icons/green-marker.svg";
import redMarkerUrl from "../../../../assets/icons/red-marker.svg";
import { Alert, Group, Params, toFixed } from "../../../../utils";
import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import Provider, { useProvider } from "../../../../components/provider";
import Details from "./details";
import { AppContext } from "../../../../App";

export type GeographicalMapTabContext = {
  groups: Group[];
  selectedGroup: number | null;
  selectGroup: (id: number) => void;
  showList: 0 | 1 | 2;
  setShowList: (value: 0 | 1 | 2) => void;
};

function MapControls({ bounds }: { bounds?: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) map.fitBounds(bounds);
  }, [bounds]);
  return null;
}

const defaulParams: Params = {
  pagination: {
    page: 1,
    perPage: 100,
  },
  include: {
    devices: {
      include: {
        lastTelemetries: true,
        alerts: {
          include: {
            device: {
              select: {
                serial: true,
                name: true,
              },
            },
          },
          where: {
            acknowledgedBy: null,
          },
        },
      },
    },
  },
  where: {
    lat: {
      not: null,
    },
    lng: {
      not: null,
    },
  },
};

function GeographicalMapTab() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [params, setParams] = useState<Params>(defaulParams);
  const { backendApi, tenantId } = useProvider<AppContext>();
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [showList, setShowList] = useState<0 | 1 | 2>(0);
  const filterdGroups = useMemo(() => {
    return groups.map((g) => ({
      ...g,
      alerts:
        g.devices?.reduce(
          (acc: Alert[], device) => [...acc, ...(device.alerts || [])],
          []
        ) || [],
    }));
  }, [groups]);
  function selectGroup(id: number) {
    setSelectedGroup(id);
    setShowList(2);
  }

  useEffect(() => {
    backendApi.getGroups(params).then((res) => {
      setGroups(res.results);
    });
  }, [tenantId, params]);

  const bounds = useMemo(() => {
    if (groups.length < 1)
      return [
        [15, 18],
        [41, 47],
      ] as [number, number][];
    return groups.map((group) => [group.lat, group.lng] as [number, number]);
  }, [groups]);

  return (
    <Provider
      value={{
        groups: filterdGroups,
        selectedGroup,
        selectGroup,
        showList,
        setShowList,
      }}
    >
      <div className="relative w-full h-full ">
        <MapContainer
          center={
            groups.length === 1
              ? [groups[0].lat, groups[0].lng]
              : [25.2048, 55.2708]
          }
          zoom={6}
          minZoom={3}
          attributionControl={false}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
          />
          <MapControls bounds={bounds} />
          <ZoomControl position="bottomright" />
          <For each={filterdGroups}>
            {(group) => (
              <Marker
                position={[group.lat || 0, group.lng || 0]}
                icon={
                  new L.Icon({
                    iconUrl: group.alerts?.length
                      ? redMarkerUrl
                      : greenMarkerUrl,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15],
                  })
                }
              >
                <Popup closeButton={false} autoClose>
                  <div className="flex flex-col min-w-[18rem] ">
                    <div className="py-2 text-lg font-bold">
                      {group.name} {`(${group.alerts?.length || 0})`}
                    </div>
                    <div className="flex justify-evenly h-[3.5rem] items-center bg-primary/5 rounded">
                      <DoorAlertIcon />
                      <LeakAlertIcon />
                      <LockAlertIcon />
                      <FireAlertIcon />
                      <PowerAlertIcon />
                    </div>
                    <div className="grid grid-cols-2 py-2 gap-y-2">
                      <div className="text-[#82848E]">lat, lng:</div>
                      <div className="font-bold">
                        {toFixed(group.lat, 2)}, {toFixed(group.lng, 2)}
                      </div>
                      <div className="text-[#82848E]">location: </div>
                      <div className="font-bold">{group.location}</div>
                    </div>
                    <button
                      onClick={() => {
                        group.id && selectGroup(group.id);
                      }}
                      className="outline outline-1 rounded py-2 text-lg text-primary capitalize hover:bg-primary/5 active:bg-primary/10 transition-colors"
                    >
                      more details
                    </button>
                  </div>
                </Popup>
              </Marker>
            )}
          </For>
        </MapContainer>
        <Details />
      </div>
    </Provider>
  );
}

export default GeographicalMapTab;
