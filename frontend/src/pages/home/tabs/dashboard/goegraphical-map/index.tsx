import { Chart } from "..";
import GeographicalMapTab from "../../geographical-map";

export function Geographica() {
  return (
    <Chart
      title="Geographical map"
      className="xl:col-span-2  w-full overflow-x-hidden "
    >
      <GeographicalMapTab details={false} />
    </Chart>
  );
}

export default Geographica;
