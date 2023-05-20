import { useProvider } from "../../components/provider";
import { AppContext } from "../../App";
import Modal from "../../components/modal";
import { useState } from "react";
function DevPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="h-screen w-screen dark:bg-primary-dark dark:text-light flex-center">
      <Modal
        handleClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        open={false}
      >
        <div>waza</div>
      </Modal>
    </div>
  );
}

export default DevPage;
