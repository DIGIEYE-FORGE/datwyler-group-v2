import { useProvider } from "../../components/provider";
import { AppContext } from "../../App";
import Accordion from "../../components/acordion";

function DevPage() {
  const { theme } = useProvider<AppContext>();
  return (
    <div className="h-screen w-screen dark:bg-primary-dark dark:text-light flex-center">
      <Accordion
        className="w-[50rem]"
        items={[
          {
            title: "What is the difference between a project and a task?",
            content:
              "A project is a collection of tasks. A task is a single item that needs to be completed. For example, a project might be to build a house. Tasks for that project might include: laying the foundation, framing, plumbing, electrical, etc.",
          },
          {
            title: "What is the difference between a project and a task?",
            content:
              "A project is a collection of tasks. A task is a single item that needs to be completed. For example, a project might be to build a house. Tasks for that project might include: laying the foundation, framing, plumbing, electrical, etc.",
          },
        ]}
      />
    </div>
  );
}

export default DevPage;
