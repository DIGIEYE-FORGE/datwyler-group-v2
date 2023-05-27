import { useEffect, useReducer, useState } from "react";
import DataGrid, { Column } from "../../../../components/data-grid";
import Pagination from "../../../../components/pagination";
import { Device, Group, License, Params, Report, ReportDevice } from "../../../../utils";
import { ReactComponent as CsvIcon } from "../../../../assets/icons/csv.svg";
import { ReactComponent as PdfIcon } from "../../../../assets/icons/pdf.svg";
import Tooltip from "../../../../components/tooltip";
import { format, set } from "date-fns";
import Button from "../../../../components/button";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Modal from "../../../../components/modal";
import { MdOutlineClose, MdWatchLater, MdCancel } from "react-icons/md";
import Select from "react-select";
import { useProvider } from "../../../../components/provider";
import { AppContext } from "../../../../App";
import { addHours, addDays } from "date-fns";
import BackendApi from "../../../../api/backend";

import { toast } from "react-toastify";

const defaultParams: Params = {
  pagination: {
    page: 1,
    perPage: 10,
  },

};

const paramsReducer = (
  state: Params,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "setParams":
      return action.payload;
    case "pagination":
      return {
        ...state,
        pagination: action.payload,
      };
    case "where":
      return {
        ...state,
        where: {
          ...state.where,
          ...action.payload,
        }
      };
    default:
      return state;
  }
};


function LicenseTab() {
  const [params, setParams] = useReducer(paramsReducer, defaultParams);
  const [total, setTotal] = useState(100);
  const [rows, setRows] = useState<License[]>([]);
  const [backUpRows, setBackUpRows] = useState<License[]>([]);
  const { theme, user, tenantId, licenseApi} = useProvider<AppContext>();
//   const action = (row: any) => {
//     if (row.format === "pdf")
//       return (
//         <div className="w-full h-full flex-center z-10">
//           <Tooltip>
//             <button
//               className="w-[2.5rem] aspect-square rounded-full flex-center  hover:bg-dark/5 active:bg-dark/10 transition-colors"
//               onClick={() => {
//                 backendApi
//                   .downloadFile({
//                     name: row.url,
//                     type: row.type,
//                   })
//                   .then((res) => {})
//                   .catch((err) => {
//                     toast.error(err.message);
//                   });
//               }}
//             >
//               <PdfIcon />
//             </button>
//             <div className="bg-dark/50  text-light rounded-full px-2 py-1 whitespace-nowrap mr-[4rem]">
//               export as pdf
//             </div>
//           </Tooltip>
//         </div>
//       );
//     return (
//       <div className="w-full h-full flex-center">
//         <Tooltip>
//           <button
//             onClick={() => {
//               backendApi
//                 .downloadFile({
//                   name: row.url,
//                   type: row.type,
//                 })
//                 .then((res) => {})
//                 .catch((err) => {
//                   toast.error(err.message);
//                 });
//             }}
//             className="w-[2.5rem] aspect-square rounded-full flex-center  hover:bg-dark/5 active:bg-dark/10 transition-colors"
//           >
//             <CsvIcon />
//           </button>
//           <div className="bg-dark/50 text-light rounded-full px-2 py-1 whitespace-nowrap mr-[4rem]">
//             export as csv
//           </div>
//         </Tooltip>
//       </div>
//     );
//   };
  const getLicense = async () => {
    const res = await licenseApi.getLicense({
        tenantId: tenantId,
    });
    return res;
  };

//   const getTenant = async (id:number) => {
//     const res = await .getTenant({
//         id: id,
//     });
//     return res;
//     };


  const [createLicese, setCreateLicese] = useState<{
    name: string;
    description: string;
    numberOfUsers: number;
    numberOfDataCenters: number;
    startDate: string;
    expiredAt: string;
    tenantId?: number;
    parentId?: number;
  }>({
    name:"",
    description:"",
    tenantId:tenantId|| undefined,
    parentId:user?.tenants?.filter((tenant) => tenant.id === tenantId && tenant.parentId)[0]?.parentId || undefined,
    numberOfUsers:100,
    numberOfDataCenters:100,
    startDate:new Date().toISOString(),
    expiredAt:new Date().toISOString(),
  });

  const columns: Column[] = [
    {
      label: "name",
      header: "Report name",
      field: "name",
      filter: {
        type: "text",
        onChange: (e) => {
            if (e != "")
            setRows(backUpRows.filter((row:any) => row?.name?.includes(e) || undefined));
            else
            setRows(backUpRows);
        },
      },
    },
    {
      label: "date",
      header: "created at",
      
      valueGetter: (row) => format(new Date(row.createdAt), "dd/MM/yyyy HH:mm"),
      filter: {
        type: "select",
        options: [{
          value: "lasthour",
          label: "last hour",
        },
        {
          value: "last4hours",
          label: "last 4 hours",
        }
        ,
        {
          value: "last12hours",
          label: "last 12 hours",
        },
        {
          value: "lastday",
          label: "last day",

        }
      ],
        onChange: (e:string) => {
          if (e === "lasthour")
          {
            setRows(backUpRows.filter((row:any) => new Date(row.createdAt) >= addHours(new Date(), -1)));
          }
          else if (e === "last4hours")
          {
            setRows(backUpRows.filter((row:any) => new Date(row.createdAt) >= addHours(new Date(), -4)));
          }
          else if (e === "last12hours")
          {
            setRows(backUpRows.filter((row:any) => new Date(row.createdAt) >= addHours(new Date(), -12)));
          }
          else if (e === "lastday")
          {
            setRows(backUpRows.filter((row:any) => new Date(row.createdAt) >= addDays(new Date(), -1)));
          }
          else
            setRows(backUpRows);
        },
      },
    },
    {
        label: "expired",
        header: "expired",
        
        valueGetter: (row) => format(new Date(row.expiredAt ), "dd/MM/yyyy HH:mm"),
        filter: {
          type: "select",
          options: [{
            value: "lasthour",
            label: "last hour",
          },
          {
            value: "last4hours",
            label: "last 4 hours",
          }
          ,
          {
            value: "last12hours",
            label: "last 12 hours",
          },
          {
            value: "lastday",
            label: "last day",
  
          }
        ],
          onChange: (e:string) => {
            if (e === "lasthour")
            {
                setRows(backUpRows.filter((row:any) => new Date(row.expiredAt) >= addHours(new Date(), -1)));
            }
            else if (e === "last4hours")
            {
                setRows(backUpRows.filter((row:any) => new Date(row.expiredAt) >= addHours(new Date(), -4)));
            }
            else if (e === "last12hours")
            {
                setRows(backUpRows.filter((row:any) => new Date(row.expiredAt) >= addHours(new Date(), -12)));
            }
            else if (e === "lastday")
            {
                setRows(backUpRows.filter((row:any) => new Date(row.expiredAt) >= addDays(new Date(), -1)));
            }
            else
                setRows(backUpRows);
        },
      },
    },
    {
      label: "Total users",
      header: "Total users",
      field: "numberOfUsers",
      filter: {
        type: "text",
        onChange: (e) => {
            if (e != "")
            setRows(backUpRows.filter((row:any) => row?.numberOfUsers?.toString().includes(e) || undefined));
            else
            setRows(backUpRows);
        },
      },
    },
    {
        label: "Total centers",
        header: "Total data centers",
        field: "numberOfDataCenters",
        filter: {
          type: "text",
          onChange: (e) => {
            if (e != "")
            setRows(backUpRows.filter((row:any) => row?.numberOfDataCenters?.toString().includes(e) || undefined));
            else
                setRows(backUpRows);
          },
        },
      },
    {
        label: "users connected",
        header: "users connected",
        valueGetter: (row) => row.users.length,
        filter: {
            type: "text",
            onChange: (e) => {
                if (e != "")
                setRows(backUpRows.filter((row:any) => row?.users?.length?.toString().includes(e) || undefined));
                else
                    setRows(backUpRows);
            },
        },
    },
    {
        label: "centers connected",
        header: "data centers connected",
        valueGetter: (row) => row.dataCenters.length,
        filter: {
            type: "text",
            onChange: (e) => {
                if (e != "")
                setRows(backUpRows.filter((row:any) => row?.dataCenters?.length?.toString().includes(e) || undefined));
                else
                setRows(backUpRows);
            },
        },
    }
  ];
  const [state, setState] = useState<"idle" | "loading" | "error">("loading");
  const [open, setOpen] = useState(false);
  const [DevicesData, setDevicesData] = useState<Device[]>([]);
  const [checkUpdate, setCheckUpdate] = useState(false);

  useEffect(()=>{

    setCreateLicese((prev)=>({...prev,tenantId:tenantId,
      parentId:user?.tenants?.filter((tenant) => tenant.id === tenantId && tenant.parentId)[0]?.parentId || undefined,
  }));
    getLicense().then((res:any) => {
      setState("loading");
     setRows(res?.results);
      setTotal(res?.totalResult || 0);
      setBackUpRows(res?.results);
      setState("idle");
    }).catch((err)=>{
      setState("error");
    }).finally(()=>{
      setState("idle");
    })
  },[tenantId])
  return (
    <div className="flex flex-col  gap-6 p-6">
      <div className="flex gap-4 items-center flex-wrap justify-end ">
        <Pagination
          value={params.pagination}
          onChange={(v) => setParams({ type: "pagination", payload: v })}
          total={total}
        />
        <Button
          className="flex items-center gap-2"
          onClick={() => setOpen(true)}
        >
          Generate License
          <AiOutlinePlusCircle className="text-lg" />
        </Button>
      </div>
      <DataGrid
        className=" table-fixed w-full text-left "
        headClassName="h-[5.5rem] bg-dark/5 dark:bg-light/5 text-[#697681] [&>*]:px-2 "
        rowClassName="h-[4rem] [&>*]:px-2 even:bg-dark/5 dark:even:bg-light/5 hover:bg-dark/10 dark:hover:bg-light/10"
        columns={columns}
        rows={rows}
        action={(row:any)=><div></div>}
      ></DataGrid>
      <Modal
        open={open}
        handleClose={() => setOpen(false)}
        className="bg-white w-11/12 max-w-[40rem] rounded [&>*]:border-b [&>*]:border-black/20 max-h-full overflow-auto"
      >
        <div className="flex items-center py-4  justify-between px-4">
          <span className="font-semibold">Create a License</span>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full hover:bg-dark/10 active:shadow-inner w-8 h-8 flex-center"
          >
            <MdOutlineClose className="text-2xl text-gray-500" />
          </button>
        </div>
        <form className="flex flex-col gap-6 py-4 [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&>div]:px-4">
          <div>
            <label
              className="w-fit"
              htmlFor="License-name"
              placeholder="License name"
            >
              License name
            </label>
            <input
              id="License-name"
              className="h-11"
              onChange={(e) => {
                setCreateLicese({ ...createLicese, name: e.target.value });
              }}
            />
          </div>
        
          <div>
            <label
              className="w-fit"
              htmlFor="description"
              placeholder="description"
            >
              description
            </label>
            <input
              id="description"
              className="h-11"
              onChange={(e) => {
                setCreateLicese({ ...createLicese, description: e.target.value });
              }}
            />
          </div>
          <div>
            <label
              className="w-fit"
              htmlFor="startDate"
              placeholder="startDate"
            >
              startDate
            </label>
            <input
            type="date"
              id="startDate"
              className="h-11"
              onChange={(e) => {
                setCreateLicese({ ...createLicese, startDate: new Date(e.target.value).toISOString() });
              }}
            />
          </div>
          <div>
            <label
              className="w-fit"
              htmlFor="expiredAt"
              placeholder="expiredAt"
            >
              expiredAt
            </label>
            <input
             type="date"
              id="expiredAt"
              className="h-11"
              onChange={(e) => {
                setCreateLicese({ ...createLicese, expiredAt: new Date(e.target.value).toISOString() });
              }}
            />
          </div>
          <div>
            <label
              className="w-fit"
              htmlFor="numberOfUsers"
              placeholder="numberOfUsers"
            >
              number of users
            </label>
            <input
              type="number"
              min={0}
              id="numberOfUsers"
              className="h-11"
              onChange={(e) => {
                setCreateLicese({ ...createLicese, numberOfUsers: +e.target.value });
              }}
            />
          </div>
          <div>
            <label
              className="w-fit"
              htmlFor="numberOfDataCenters"
              placeholder="numberOfDataCenters"
            >
              number of data centers
            </label>
            <input
              type="number"
              min={0}
              id="numberOfUsers"
              className="h-11"
              onChange={(e) => {

                  setCreateLicese({ ...createLicese, numberOfDataCenters: +e.target.value });
              }}
            />
          </div>
        </form>
        <div className="flex justify-between items-center h-20 px-6">
          <Button
            className="flex items-center gap-2 py-3 px-4"
            variant="outlined"
            onClick={() => setOpen(false)}
          >
            <span>Cancel</span>
            <MdCancel className="text-2xl" />
          </Button>
          <Button
            className="flex items-center gap-2 py-3 px-4"
            onClick={() => {
             licenseApi.addLicense(createLicese).then((res:any) => {
              setRows((prev) => [...prev, res]);
                setOpen(false);
              }
              ).catch((err) => {
                console.log(err);
              }
              )
            }}
          >
            <span>Genarate</span>
            <MdWatchLater className="text-2xl" />
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default LicenseTab;
