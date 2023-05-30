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
import { useLocation } from "react-router-dom";
import Show from "../../../../components/show";
import Button from "../../../../components/button";
import {
  MdDeleteOutline,
  MdEdit,
  MdOutlineAddLocationAlt,
  MdOutlineSave,
} from "react-icons/md";
import Modal from "../../../../components/modal";
import { GroupData } from "../../../../api/backend";
import { toast } from "react-toastify";

export type GeographicalMapTabContext = {
  groups: Group[];
  selectedGroup: number | null;
  selectGroup: (id: number) => void;
  showList: 0 | 1 | 2;
  setShowList: (value: 0 | 1 | 2) => void;
  setGroupData: React.Dispatch<React.SetStateAction<GroupData | null>>;
};

function MapControls({ bounds }: { bounds?: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      if (bounds.length == 1) map.setView(bounds[0], 10);
      else if (bounds.length > 1) map.fitBounds(bounds);
    }
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

interface Props {
  details?: boolean;
}

const defaultGroupData: GroupData = {
  name: "",
  location: "",
  ip: "",
};

function GeographicalMapTab({ details = true }: Props) {
  const {
    groups: rawGroups,
    setGroups,
    tenantParentId,
    tenantId,
    backendApi,
    confirm,
  } = useProvider<AppContext>();
  const [search, setSearch] = useState("");
  const groups = useMemo(() => {
    return rawGroups.filter(
      (g) =>
        g.name.toLowerCase().includes(search.toLowerCase()) ||
        g.location?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, rawGroups]);
  const [groupData, setGroupData] = useState<GroupData | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [showList, setShowList] = useState<0 | 1 | 2>(0);

  const deleteGroup = (id: number) => {
    console.log("delete group", id);

    confirm({
      title: "Delete Group",
      description: "Are you sure you want to delete this group?",
      onConfirm: async () => {
        try {
          const res = await backendApi.deleteGroup(id);
          toast.success("Group deleted successfully");
          setGroups(groups.filter((g) => g.id !== res.id));
        } catch (e) {
          console.error(e);
          toast.error("Failed to delete group");
        }
      },
    });
  };

  async function handleSave() {
    if (!tenantId || !groupData) return;
    try {
      const data = await backendApi.addEditGroup({
        ...groupData,
        tenantId,
        tenantParentId,
      });
      toast.success("Group saved successfully");
      if (groupData.id) {
        console.log("edit group", data);

        setGroups(
          groups.map((g) => {
            if (g.id === groupData.id)
              return {
                ...g,
                ...data,
              };
            return g;
          })
        );
      } else {
        console.log("add group", data);
        setGroups([
          ...groups,
          {
            ...data,
            devices: [],
          },
        ]);
      }
      setGroupData(null);
    } catch (e) {
      console.log(e);
      toast.error("Failed to save group");
    }
  }
  function selectGroup(id: number) {
    setSelectedGroup(id);
    setShowList(2);
  }

  const bounds = useMemo(() => {
    return groups.map((group) => [group.lat, group.lng] as [number, number]);
  }, [groups]);

  return (
    <Provider
      value={{
        groups,
        selectedGroup,
        selectGroup,
        showList,
        setShowList,
        setGroupData,
      }}
    >
      <div className="relative w-full h-full">
        <Show when={details}>
          <div className="absolute z-[500] top-4 right-4 flex items-center gap-4 ">
            <input
              type="text"
              className="bg-light/75 dark:bg-primary-dark/75 bg-blur w-[13.5rem] py-1"
              placeholder="Search by name or location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              className="flex items-center gap-2 capitalize"
              onClick={() => setGroupData(defaultGroupData)}
            >
              <span className="hidden md:inline-block">add site</span>
              <MdOutlineAddLocationAlt className="text-lg " />
            </Button>
          </div>
        </Show>
        <MapContainer
          center={
            groups.length === 1
              ? [groups[0].lat, groups[0].lng]
              : [25.2048, 55.2708]
          }
          zoom={6}
          minZoom={4}
          maxZoom={8}
          attributionControl={false}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.google.com/vt/lyrs=m&hl=en&gl=ma&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
          <MapControls bounds={bounds} />
          <ZoomControl position="bottomright" />
          <For each={groups}>
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
                    <div className="py-2 text-lg font-bold flex justify-between">
                      <span>
                        {group.name} {`(${group.alerts?.length || 0})`}
                      </span>
                      <Show when={details}>
                        <Button
                          variant="text"
                          color="info"
                          className="ml-auto !rounded-full"
                          onClick={() => {
                            const groupData: GroupData = {
                              id: group.id,
                              name: group.name,
                              location: group.location,
                              ip: group.ip,
                              lat: group.lat,
                              lng: group.lng,
                            };
                            setGroupData(groupData);
                          }}
                        >
                          <MdEdit />
                        </Button>
                        <Button
                          variant="text"
                          color="danger"
                          className="!rounded-full"
                          onClick={() => deleteGroup(group.id)}
                        >
                          <MdDeleteOutline />
                        </Button>
                      </Show>
                    </div>
                    {/* <div className="flex justify-evenly h-[3.5rem] items-center bg-primary/5 rounded">
                      <DoorAlertIcon />
                      <LeakAlertIcon />
                      <LockAlertIcon />
                      <FireAlertIcon />
                      <PowerAlertIcon />
                    </div> */}
                    <div className="grid grid-cols-2 py-2 gap-y-2">
                      <div className="text-[#82848E]">lat, lng:</div>
                      <div className="font-bold">
                        {toFixed(group.lat, 5)}, {toFixed(group.lng, 5)}
                      </div>
                      <div className="text-[#82848E]">location: </div>
                      <div className="font-bold">{group.location}</div>
                    </div>
                    <Show when={details}>
                      <button
                        onClick={() => {
                          group.id && selectGroup(group.id);
                        }}
                        className="outline outline-1 rounded py-2 text-lg text-primary capitalize hover:bg-primary/5 active:bg-primary/10 transition-colors"
                      >
                        more details
                      </button>
                    </Show>
                  </div>
                </Popup>
              </Marker>
            )}
          </For>
        </MapContainer>
        <Show when={details}>
          <Details />
        </Show>
      </div>
      <Modal
        open={!!groupData}
        handleClose={() => {
          setGroupData(null);
        }}
        className="grid grid-cols-4 [&>label]:col-span-1 [&>input]:col-span-3 gap-y-4 p-4 min-w-[20rem] bg-blur !bg-light/75 dark:!bg-primary-dark/75 !z-[500]"
      >
        <div className="capitalize text-center text-xl border-b pb-2 col-span-full">
          {groupData?.id ? "edit" : "add"} site
        </div>
        <label htmlFor="name">name</label>
        <input
          type="text"
          id="name"
          placeholder="Site name"
          value={groupData?.name}
          onChange={(e) => {
            setGroupData({
              ...groupData!,
              name: e.target.value,
            });
          }}
        />
        <label htmlFor="location">location</label>
        <input
          type="text"
          id="location"
          placeholder="Site location"
          value={groupData?.location}
          onChange={(e) => {
            setGroupData({
              ...groupData!,
              location: e.target.value,
            });
          }}
        />
        <label htmlFor="ip">ip</label>
        <input
          type="text"
          id="ip"
          placeholder="Site location"
          value={groupData?.ip}
          onChange={(e) => {
            setGroupData({
              ...groupData!,
              ip: e.target.value,
            });
          }}
        />
        <label htmlFor="lat">lat</label>
        <input
          type="number"
          id="lat"
          placeholder="Site lattitude"
          value={groupData?.lat}
          onChange={(e) => {
            setGroupData({
              ...groupData!,
              lat: Number(e.target.value),
            });
          }}
        />
        <label htmlFor="lng">lng</label>
        <input
          id="lng"
          type="number"
          placeholder="Site longitude"
          value={groupData?.lng}
          onChange={(e) => {
            setGroupData({
              ...groupData!,
              lng: Number(e.target.value),
            });
          }}
        />
        <div className="pt-4 border-t flex-center col-span-full">
          <Button
            className="flex items-center gap-2"
            disabled={
              !groupData ||
              Object.values(groupData).some((v) => !v) ||
              !groupData.lat ||
              !groupData.lng
            }
            onClick={handleSave}
          >
            <span className="capitalize">save</span>
            <MdOutlineSave className="text-xl" />
          </Button>
        </div>
      </Modal>
    </Provider>
  );
}

export default GeographicalMapTab;
