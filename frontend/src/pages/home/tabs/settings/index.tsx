import React from "react";
import For from "../../../../components/for";
import SwipeableTabs from "../../../../components/swipeable-tabs";
import Tabs from "../../../../components/tabs";
import GeneraleState from "./generale-state";
import Subscription from "./subscription";

function SettingsTab() {
  const [state, setState] = React.useState<number>(0);
  return (
    <div className="w-[100%] h-[100%] p-6 flex flex-col min-w-[40rem]">
      <div className="border-b border-dark/20">
        <Tabs
          className="translate-y-[2px]"
          labels={[<div className="pb-4">General settings</div>]}
          activeClassName="text-primary font-semibold "
          index={state}
          onChange={(index) => {
            setState(index);
          }}
        />
      </div>
      <SwipeableTabs index={state} className="w-[100%] h-full">
        <GeneraleState />
      </SwipeableTabs>
    </div>
  );
}

export default SettingsTab;
