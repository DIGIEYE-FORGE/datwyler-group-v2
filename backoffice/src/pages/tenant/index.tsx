import React from "react";
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

function TenantPage() {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [affirm, AffirmModal] = useAffirm({
    defautlMessage: "Are you sure?",
  });
  return (
    <SplitableTabs
      open={open}
      close={() => {
        setOpen(false);
      }}
    >
      <div className="page">
        <div className="header">
          <div className="title">tenants</div>
          <Button
            color="success"
            className="flex align-center gap-3"
            onClick={() => {
              setOpen((curr) => !curr);
              setIsEdit(false);
            }}
          >
            <span>add Tenant</span>
            <img src={AddIcon} alt="add" />
          </Button>
        </div>
      </div>
      <div className="add-edit">waza</div>
    </SplitableTabs>
  );
}

export default TenantPage;
