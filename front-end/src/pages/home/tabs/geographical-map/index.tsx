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
import { Group } from "../../../../utils";
import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import { generateGroups } from "./dummyData";
import Provider from "../../../../components/provider";
import Details from "./details";

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

function GeographicalMapTab() {
  const [groups, setGroups] = useState(generateGroups(10));
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [showList, setShowList] = useState<0 | 1 | 2>(0);
  function selectGroup(id: number) {
    setSelectedGroup(id);
    setShowList(2);
  }

  const bounds = useMemo(() => {
    return groups.map(
      (group) =>
        [group.attributes?.lat || 0, group.attributes?.lng || 0] as [
          number,
          number
        ]
    );
  }, []);

  return (
    <Provider
      value={{
        groups,
        selectedGroup,
        selectGroup,
        showList,
        setShowList,
      }}
    >
      <div className="relative w-full h-full ">
        <MapContainer
          center={[25.2048, 55.2708]}
          zoom={6}
          minZoom={3}
          attributionControl={false}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapControls bounds={bounds} />
          <ZoomControl position="bottomright" />
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
              >
                <Popup closeButton={false} autoClose>
                  <div className="flex flex-col min-w-[18rem] ">
                    <div className="py-2 text-lg font-bold">
                      {group.name} {`(${group.attributes?.alerts || 0})`}
                    </div>
                    <div className="flex justify-evenly h-[3.5rem] items-center bg-primary/5 rounded">
                      <DoorAlertIcon />
                      <LeakAlertIcon />
                      <LockAlertIcon />
                      <FireAlertIcon />
                      <PowerAlertIcon />
                    </div>
                    <div className="grid grid-cols-2 = gap-4 py-4">
                      <For
                        each={Object.entries(group.attributes || {}).filter(
                          ([key]) =>
                            key !== "lat" &&
                            key !== "lng" &&
                            key !== "alerts" &&
                            key !== "location"
                        )}
                      >
                        {([key, value]) => (
                          <div className="grid grid-cols-2">
                            <div className="text-[#82848E]">{key}</div>
                            <div className="font-bold">{value}</div>
                          </div>
                        )}
                      </For>
                    </div>
                    <button
                      onClick={() => {
                        selectGroup(group.id);
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
