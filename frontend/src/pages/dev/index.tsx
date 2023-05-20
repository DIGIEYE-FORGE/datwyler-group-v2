import { useProvider } from "../../components/provider";
import { AppContext } from "../../App";
import Modal from "../../components/modal";
import { useState } from "react";
import Button from "../../components/button";
type ConfirmData = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
};

function DevPage() {
  const [openConfirm, setOpenConfirm] = useState(false);
  const handleOpenConfirm = () => {
    if (openConfirm) setConfirmData({});
    setOpenConfirm((curr) => !curr);
  };

  const [confirmData, setConfirmData] = useState<ConfirmData>({});

  const confirm = (cdata: ConfirmData | undefined) => {
    if (cdata) setConfirmData(cdata);
    setOpenConfirm(true);
  };
  return (
    <div className="h-screen w-screen dark:bg-primary-dark dark:text-light flex-center">
      <Button onClick={handleOpenConfirm}>open modal</Button>
      <Modal
        handleClose={handleOpenConfirm}
        open={openConfirm}
        className="flex flex-col p-4 gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold">
            {confirmData.title || "Confirm"}
          </h1>
        </div>
        <div>
          {confirmData.description ||
            "This Action is irreversible. Are you sure you want to proceed?"}
        </div>
        <div className="flex justify-between">
          <Button
            onClick={() => {
              confirmData.onCancel?.();
              handleOpenConfirm();
            }}
          >
            {confirmData.cancelText || "Cancel"}
          </Button>
          <Button
            onClick={() => {
              confirmData.onConfirm?.();
              handleOpenConfirm();
            }}
          >
            {confirmData.confirmText || "Confirm"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
{
  /* <Dialog handler={handleOpenConfirm} open={openConfirm}>
      <DialogHeader>
        <h1 className="text-2xl font-bold">
          {confirmData.title || "Confirm"}
        </h1>
      </DialogHeader>
      <DialogBody divider>
        {confirmData.description ||
          "This Action is irreversible. Are you sure you want to proceed?"}
      </DialogBody>
      <DialogFooter className="flex justify-between">
        <Button
          color="gray"
          variant="gradient"
          onClick={() => {
            confirmData.onCancel?.();
            handleOpenConfirm();
          }}
        >
          {confirmData.cancelText || "Cancel"}
        </Button>
        <Button
          onClick={() => {
            confirmData.onConfirm?.();
            handleOpenConfirm();
          }}
        >
          {confirmData.confirmText || "Confirm"}
        </Button>
      </DialogFooter>
    </Dialog>
*/
}
export default DevPage;
