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

function parseJSON(value: string) {
  try {
    return JSON.parse(value);
  } catch (error) {
    return undefined;
  }
}

const NoData = () => {
  return (
    <div className="flex flex-col gap-6">
      <img src={noDataImg} alt="no data" />
    </div>
  );
};

const dateMap: {
  [key: string]: {
    lt?: Date;
    gt?: Date;
  };
} = {
  "1h": {
    gt: new Date(new Date().getTime() - 60 * 60 * 1000),
  },
  "4h": {
    gt: new Date(new Date().getTime() - 4 * 60 * 60 * 1000),
  },
  "12h": {
    gt: new Date(new Date().getTime() - 12 * 60 * 60 * 1000),
  },
  "last day": {
    gt: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
  },
  "last week": {
    gt: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
  },
};

type Tenant = {
  id?: number;
  parentId?: number;
  name: string;
  _count: {
    users: number;
    subTenants: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
};

const defualtTenants: Tenant[] = [
  {
    id: 1,
    name: "tenant 1",
    _count: {
      users: 10,
      subTenants: 5,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "tenant 2",
    _count: {
      users: 11,
      subTenants: 5,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function TenantPage() {
  const [tenantId] = useProvider<UserContext>().tenantSelected;

  const [tenants, setTenants] = useState<Tenant[]>(defualtTenants);
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
      valueGetter: (row) => row._count.subTenants,
      label: "type",
    },
    {
      header: "last updated",
      valueGetter: (row) => format(new Date(row.updatedAt), "dd/MM/yyyy HH:mm"),
      label: "last updated",
    },
  ];

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
                    console.log("edit", row);
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
            className="body"
            style={{
              borderTop: "1px solid #2125293a",
            }}
          >
            <div className="row-input">
              <label htmlFor="deviceId">name</label>
              <div>
                <Input
                  id="name"
                  value={selectedTenant?.name}
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
          </div>
        </div>
      </SplitableTabs>
      <AffirmModal />
    </Provider>
  );
}

export default TenantPage;
