import React from "react";
import { GeographicalMapTabContext } from ".";
import For from "../../../../components/for";
import { useProvider } from "../../../../components/provider";
import { classNames } from "../../../../utils";

function GroupsList() {
  const { groups, selectedGroup, showList, setShowList, selectGroup } =
    useProvider<GeographicalMapTabContext>();

  return (
    <div
      className={classNames(
        "relative min-w-full overflow-y-auto flex-col gap-4 px-2 transition-[right]",
        {
          "max-w-0 max-h-0": !showList,
        }
      )}
      style={{
        right: showList == 2 ? "100%" : 0,
      }}
    >
      <For each={groups}>
        {(group) => (
          <div
            className="flex rounded p-2 gap-2 cursor-pointer hover:bg-primary/10 items-center
                  border-dashed border-b-2 border-dark/10
                  "
            onClick={() => {
              selectGroup(group.id);
            }}
          >
            <div className="flex-1">
              <div>{group.name}</div>
              <div>{group.attributes?.location}</div>
            </div>
            <div
              className={classNames("w-2 aspect-square rounded-full ", {
                "bg-primary": !group.attributes?.alerts,
                "bg-accent": !!group.attributes?.alerts,
              })}
            ></div>
          </div>
        )}
      </For>
    </div>
  );
}

export default GroupsList;
