import { motion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import SwipeableTabs from "../../../../components/swipeable-tabs";
import Tabs from "../../../../components/tabs";
import useReactState from "../../../../hooks/user-react-state";

let globalCount = 0;
const Counter = () => {
  useEffect(() => {
    globalCount++;
    console.log("Counter mounted", globalCount);
  });
  return (
    <div className="outline outline-dark px-4 py-2 text-center min-w-[6rem] text-lg">
      count
    </div>
  );
};

const MemoCounter = memo(Counter);

function DevTab() {
  const user = useReactState({
    name: {
      first: "John",
      last: "Smith",
    },
    age: 25,
  });

  return (
    <div className="w-full h-full flex-col flex-center relative debu">
      <input
        type="text"
        placeholder="first name"
        value={user.name.first}
        onChange={(e) => {
          user.name = { ...user.name, first: e.target.value };
        }}
      />
      <MemoCounter />
    </div>
  );
}

export default DevTab;
