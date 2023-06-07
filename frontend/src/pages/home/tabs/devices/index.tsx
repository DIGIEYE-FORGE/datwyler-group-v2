import { useEffect, useState } from "react";
import DataGrid, { Column } from "../../../../components/data-grid";
import Pagination from "../../../../components/pagination";
import { Device, Group, Params, strTake, systems } from "../../../../utils";
import Button from "../../../../components/button";
import { useProvider } from "../../../../components/provider";
import { AppContext } from "../../../../App";
import {
  MdAddCircleOutline,
  MdBackspace,
  MdDeleteOutline,
  MdEdit,
  MdMoreVert,
  MdSave,
} from "react-icons/md";
import Modal from "../../../../components/modal";
import For from "../../../../components/for";
import Popover from "../../../../components/popover";
import { DeviceData } from "../../../../api/backend";
import { toast } from "react-toastify";
import Tooltip from "../../../../components/tooltip";
import Show from "../../../../components/show";
import { IconButton } from "../dashboard";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";
import { BiExport } from "react-icons/bi";

const defaultData: DeviceData = {
  name: "UPS",
  serial: "",
};

function DevicesTab() {
  const { tenantId, backendApi, confirm } = useProvider<AppContext>();
  const [total, setTotal] = useState(0);
  const [deviceData, setDeviceData] = useState<DeviceData | null>(null);
  const [params, setParams] = useState<Params>({
    pagination: {
      page: 1,
      perPage: 5,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      group: true,
      _count: true,
    },
    where: {},
  });
  const [state, setState] = useState<"idle" | "loading" | "error">("loading");

  const [rows, setRows] = useState<Device[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);

  async function getDevices(params: Params) {
    try {
      setState("loading");
      const res = await backendApi.getDevices(params);
      setRows(res.results);
      setTotal(res.totalResult);

      setState("idle");
    } catch (err) {
      console.log(err);
      setState("error");
    }
  }

  async function getGroups() {
    try {
      const data = await backendApi.getGroupsName();
      setGroups(data.results);
    } catch (err) {
      console.log(err);
    }
  }

  async function addEditDevice() {
    if (!deviceData || !tenantId) return;
    try {
      const res = await backendApi.addEditDevice({ ...deviceData, tenantId });
      toast.success("Device saved successfully");
      setDeviceData(null);
      getDevices(params);
    } catch (err) {
      console.error(err);
      toast.error("Error saving device");
    }
  }

  async function deleteDevice(id: number) {
    confirm({
      title: "Delete device",
      description: "Are you sure you want to delete this device?",
      onConfirm: async () => {
        try {
          await backendApi.deleteDevice(id);
          toast.success("Device deleted successfully");
          setDeviceData(null);
          getDevices(params);
        } catch (err) {
          console.error(err);
          toast.error("Error deleting device");
        }
      },
    });
  }

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    getDevices(params);
  }, [tenantId, params]);

  const columns: Column[] = [
    {
      label: "location",
      header: "Location",
      valueGetter: (row: Device) => row.group?.location,
      filter: {
        type: "text",
        onChange: (v: any) => {
          setParams({
            ...params,
            where: {
              ...params.where,
              group: {
                location: {
                  contains: v,
                  mode: "insensitive",
                },
              },
            },
          });
        },
      },
    },
    {
      label: "site",
      header: "Site",
      valueGetter: (row: Device) => row.group?.name,
      filter: {
        type: "text",
        onChange: (v: any) => {
          setParams({
            ...params,
            where: {
              ...params.where,
              group: {
                name: {
                  contains: v,
                  mode: "insensitive",
                },
              },
            },
          });
        },
      },
    },
    {
      label: "system",
      header: "System",
      valueGetter: (row) => row.name,
      filter: {
        type: "select",
        options: systems.map((s) => ({ label: s, value: s })),

        onChange: (v: any) => {
          setParams({
            ...params,
            where: {
              ...params.where,
              name: {
                contains: v,
                mode: "insensitive",
              },
            },
          });
        },
      },
    },
    {
      label: "Serial",
      header: "Serial",
      field: "serial",
      filter: {
        type: "text",
        onChange: (v: any) => {
          setParams({
            ...params,
            where: {
              ...params.where,
              serial: {
                contains: v,
                mode: "insensitive",
              },
            },
          });
        },
      },
    },
  ];
  return (
    <div className="flex flex-col  w-full gap-6 p-6 ">
      <div className="ml-auto flex gap-4 items-center w-fit flex-wrap ">
        <Pagination
          value={params.pagination}
          onChange={(v) => setParams({ ...params, pagination: v })}
          total={total}
          offset={1}
        />
        <Button
          className="flex items-center gap-2 ml-auto"
          onClick={() => setDeviceData(defaultData)}
        >
          add
          <MdAddCircleOutline className="text-lg" />
        </Button>
      </div>
      <DataGrid
        error={state === "error"}
        loading={state === "loading"}
        className="table-fixed  w-full  text-left "
        headClassName="h-[5.5rem] bg-dark/5 dark:bg-light/5 text-[#697681] [&>*]:px-2 "
        rowClassName="h-[4rem] [&>*]:px-2 even:bg-dark/5 dark:even:bg-light/5 hover:bg-dark/10 dark:hover:bg-light/10"
        columns={columns}
        rows={rows.slice(
          (params.pagination.page - 1) * params.pagination.perPage,
          params.pagination.page * params.pagination.perPage
        )}
        noData={
          <div className="min-h-[50vh]   flex justify-center items-center text-4xl">
            No data
          </div>
        }
        action={(row: Device) => (
          <Popover>
            <IconButton>
              <MdMoreVert className="text-xl" />
            </IconButton>
            <div className="card  aspect-square -translate-x-1/2 px-2 pt-4  flex flex-col  ">
              <button
                className="flex w-[6rem] items-center justify-between  p-2 hover:text-info hover:"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeviceData({
                    id: row.id,
                    name: row.name,
                    serial: row.serial,
                    groupId: row.groupId,
                  });
                }}
              >
                <span>Edit</span>
                <MdEdit className="text-xl" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteDevice(row.id);
                }}
                className="flex w-[6rem] items-center justify-between p-2 hover:text-danger"
              >
                <span>Delete</span>
                <MdDeleteOutline className="text-xl" />
              </button>
            </div>
          </Popover>
        )}
      ></DataGrid>
      <Modal
        open={!!deviceData}
        handleClose={() => setDeviceData(null)}
        className="bg-light/75 dark:bg-dark/75 bg-blur  max-w-[30rem] w-11/12"
      >
        <div className="py-4 text-center border-b">
          {deviceData?.id ? "Edit" : "Add"} Device
        </div>
        <div className="flex flex-col p-4 gap-4 [&>input]:w-full ">
          <input
            type="text"
            placeholder="Serial *"
            value={deviceData?.serial}
            onChange={(e) =>
              setDeviceData({ ...deviceData!, serial: e.target.value })
            }
          />
          <select
            name="system"
            value={deviceData?.name}
            onChange={(e) =>
              setDeviceData({
                ...deviceData!,
                name: e.target.value,
              })
            }
          >
            <For each={[...systems]}>
              {(system) => <option value={system}>{system}</option>}
            </For>
          </select>
          <Show when={!deviceData?.id}>
            <textarea
              name="descreption"
              className="h-20"
              placeholder="Descreption"
              value={deviceData?.description}
              onChange={(e) =>
                setDeviceData({
                  ...deviceData!,
                  description: e.target.value,
                })
              }
            ></textarea>
          </Show>
          <select
            name="group"
            value={deviceData?.groupId || ""}
            onChange={(e) =>
              setDeviceData({
                ...deviceData!,
                groupId: parseInt(e.target.value),
              })
            }
          >
            <option value={""} disabled={deviceData?.groupId !== undefined}>
              select group
            </option>
            <For each={groups}>
              {(group) => <option value={group.id}>{group.name}</option>}
            </For>
          </select>
        </div>
        <div className="flex justify-between  p-4 border-t">
          <Button
            className="flex items-center gap-2"
            onClick={() => setDeviceData(null)}
          >
            <span>Cancel</span>
            <MdBackspace className="text-xl" />
          </Button>
          <Button
            className="flex items-center gap-2"
            disabled={!deviceData?.name || !deviceData?.serial}
            onClick={addEditDevice}
          >
            <span>Save</span>
            <MdSave className="text-xl" />
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default DevicesTab;
