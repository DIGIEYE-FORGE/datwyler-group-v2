import { useTranslation } from "react-i18next";
import { Chart } from "..";
import GeographicalMapTab from "../../geographical-map";

export function Geographica() {
  const { t } = useTranslation();
  return (
    <Chart
      title="geographical map"
      className="xl:col-span-2  w-full overflow-x-hidden "
    >
      <GeographicalMapTab details={false} />
    </Chart>
  );
}

export default Geographica;
