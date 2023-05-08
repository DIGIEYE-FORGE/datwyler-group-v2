import { memo, useEffect, useState } from "react";
import Card from "../../../../components/card";

function DevTab() {
  return (
    <div className="w-full h-full ">
      <div className="flex flex-wrap gap-12 p-12">
        <Card className="w-[20rem] p-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nulla vel
          eos quibusdam cumque sequi eveniet, dolorum officia vitae accusantium
          sint deleniti id atque facere? Delectus ut consequuntur quae
          voluptate.
        </Card>
        <Card className="w-[20rem] p-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nulla vel
          eos quibusdam cumque sequi eveniet, dolorum officia vitae accusantium
          sint deleniti id atque facere? Delectus ut consequuntur quae
          voluptate.
        </Card>
      </div>
    </div>
  );
}

export default DevTab;
