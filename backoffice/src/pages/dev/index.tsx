import React from "react";
import { useTranslation } from "react-i18next";
import LoadingTable from "../../components/loading-table";
import Spinner from "../../components/spiner";

const DevPage = () => {
  const { t, i18n } = useTranslation();
  return <Spinner className="debug" />;
};

export default DevPage;
