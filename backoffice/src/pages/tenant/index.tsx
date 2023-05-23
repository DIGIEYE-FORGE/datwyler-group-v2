import React, { useMemo } from "react";
import Button from "../../components/button";
import { useState, useReducer, useEffect } from "react";
import SplitableTabs from "../../components/splitable-tabs";
import DataGrid, { Column } from "../../components/data-grid";
import { format } from "date-fns";
import noDataImg from "../../assets/images/no-data.svg";
import Pagination from "../../components/pagination";
import { toast } from "react-toastify";
import useAffirm from "../../hooks/use-affirm";
import AddIcon from "../../assets/icons/add.svg";
import Provider, { useProvider } from "../../components/provider";
import backIcon from "../../assets/icons/back.svg";
import Input from "../../components/input";
import { UserContext } from "../../App";
import axios from "axios";

function parseJSON(value: string) {
  try {
    return JSON.parse(value);
  } catch (error) {
    return undefined;
  }
}

async function fetchTenants(tenantId: number) {
  const result = await axios.get(
    `http://${window.location.hostname}:4000/tenant/`,
    {
      params: {
        where: JSON.stringify({ parentId: tenantId }),
        include: JSON.stringify({
          _count: true,
          children: {
            include: {
              _count: true,
            },
          },
        }),
      },
    }
  );
  return result.data;
}

async function createTenant(tenant: Tenant) {
  const { name, parentId } = tenant;
  const result = await axios.post(
    `http://${window.location.hostname}:4000/tenant/`,
    {
      name,
      parentId,
    }
  );
  return result.data;
}

async function updateTenant(tenant: Tenant) {
  const { name } = tenant;
  const result = await axios.patch(
    `http://${window.location.hostname}:4000/tenant/${tenant.id}`,
    {
      name,
    }
  );
  return result.data;
}

async function deleteTenant(tenant: Tenant) {
  const result = await axios.delete(
    `http://${window.location.hostname}:4000/tenant/${tenant.id}`
  );
  return result.data;
}

const NoData = () => {
  return (
    <div className="flex flex-col gap-6">
      <img src={noDataImg} alt="no data" />
    </div>
  );
};

type Tenant = {
  id?: number;
  parentId?: number;
  name: string;
  _count: {
    users: number;
    subTenants: number;
  };
  children?: Tenant[];
  createdAt?: Date;
  updatedAt?: Date;
};

function TenantPage() {
  const [tenantId] = useProvider<UserContext>().tenantSelected;

  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [affirm, AffirmModal] = useAffirm({
    defautlMessage: "Are you sure?",
  });

  const defaultTenant = useMemo(
    () =>
      ({
        parentId: tenantId,
        name: "",
        _count: {
          users: 0,
          subTenants: 0,
        },
      } as Tenant),
    [tenantId]
  );

  const columns: Column[] = [
    {
      header: "name",
      field: "name",
      label: "name",
    },
    {
      header: "users",
      valueGetter: (row) => row._count.users,
      label: "type",
    },
    {
      header: "subTenants",
      valueGetter: (row) => row._count.children,
      label: "type",
    },
    {
      header: "last updated",
      valueGetter: (row) => format(new Date(row.updatedAt), "dd/MM/yyyy HH:mm"),
      label: "last updated",
    },
  ];

  useEffect(() => {
    fetchTenants(tenantId).then((data) => {
      console.log(data);
      setTenants(data);
    });
  }, [tenantId]);

  async function handleSave() {
    try {
      if (selectedTenant?.id) {
        const tenant = await updateTenant(selectedTenant);
        console.log(tenant);
        setSelectedTenant(null);
        setTenants((prev) =>
          prev.map((item) => (item.id === tenant.id ? tenant : item))
        );
      } else if (selectedTenant) {
        const tenant = await createTenant(selectedTenant);
        console.log(tenant);
        setSelectedTenant(null);
        setTenants((prev) => [...prev, tenant]);
      }
      toast.success(
        `Tenant ${selectedTenant?.id ? "updated" : "created"} successfully`
      );
    } catch (error) {
      console.log(error);

      toast.error("Error saving tenant");
    }
  }

  return (
    <Provider value={{}}>
      <SplitableTabs
        open={!!selectedTenant}
        close={() => {
          setSelectedTenant(null);
        }}
      >
        <div className="page">
          <div className="header">
            <div className="title">tenants management</div>
            <Button
              color="success"
              className="flex align-center gap-3"
              onClick={() => {
                setSelectedTenant(defaultTenant);
              }}
            >
              <span>add Tenant</span>
              <img src={AddIcon} alt="add" />
            </Button>
          </div>
          <div className="h-full flex flex-col gap-4 p-6 ">
            <div className="flex">
              <span>tenants list</span>
              <span className="ml-auto"></span>
              <Pagination
                total={tenants.length || 1}
                page={1}
                perPage={10}
                onPageChange={() => {}}
              />
            </div>
            <div className="flex-1">
              <DataGrid
                headerClassName="capitalize"
                rowClassName="capitalize"
                columns={columns}
                rowStyle={{
                  fontSize: "14px",
                }}
                rows={tenants}
                noData={<NoData />}
                onRowSelect={({ type, row }) => {
                  if (type === "view") {
                    setSelectedTenant(row as Tenant);
                  }
                  if (type === "delete") {
                    affirm(() => {
                      console.log("delete", row);
                    });
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="add-edit">
          <div className="header">
            <div className="title">
              {selectedTenant?.id ? "edit" : "add"} tenant
            </div>
            <Button
              variant="indicator"
              className="flex gap-4"
              onClick={() => {
                setSelectedTenant(null);
              }}
            >
              <span>back</span>
              <img height={12} src={backIcon} alt="back" />
            </Button>
          </div>
          <div
            className="body "
            style={{
              borderTop: "1px solid #2125293a",
            }}
          >
            <div className="row-input">
              <label htmlFor="deviceId">name</label>
              <div>
                <Input
                  id="name"
                  value={selectedTenant?.name || ""}
                  placeholder="Name"
                  onChange={(e) => {
                    if (!selectedTenant) return;
                    setSelectedTenant({
                      ...selectedTenant,
                      name: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            {selectedTenant?.children && (
              <>
                <div
                  className="p-4 pt-8  capitalize"
                  style={{
                    fontSize: "18px",
                    fontWeight: 500,
                  }}
                >
                  children
                </div>
                <DataGrid
                  headerClassName="capitalize bg-gray-50 "
                  className="shadow"
                  headerStyle={{
                    borderBottom: "2px solid #7f7f7f2f",
                    borderTop: "2px solid #7f7f7f2f",
                    height: "50px",
                  }}
                  rowStyle={{
                    borderBottom: "2px solid #7f7f7f2f",
                    height: "50px",
                  }}
                  columns={[
                    {
                      header: "name",
                      field: "name",
                      label: "name",
                    },
                    {
                      header: "users",
                      valueGetter: (row) => row._count?.users,
                      label: "users",
                    },
                    {
                      header: "children",
                      valueGetter: (row) => row._count?.children,
                      label: "children",
                    },
                    {
                      header: "created at",
                      valueGetter: (row) =>
                        format(new Date(row.createdAt), "dd/MM/yyyy HH:mm"),
                      label: "children",
                    },
                  ]}
                  rows={selectedTenant?.children || []}
                  actions={false}
                />
              </>
            )}
            4
          </div>
          <div className="flex items-center justify-between p-6">
            <Button
              onClick={() => {
                setSelectedTenant(null);
              }}
            >
              cancel
            </Button>
            <Button disabled={!selectedTenant?.name} onClick={handleSave}>
              save
            </Button>
          </div>
        </div>
      </SplitableTabs>
      <AffirmModal />
    </Provider>
  );
}

export default TenantPage;
