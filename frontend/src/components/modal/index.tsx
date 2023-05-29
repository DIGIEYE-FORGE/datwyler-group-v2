import { HTMLMotionProps, AnimatePresence, motion } from "framer-motion";
import Backdrop from "../backdrop";

interface ModalProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  handleClose: () => void;
  open: boolean;
}

function Modal({ children, className, ...props }: ModalProps) {
  const DropIn = {
    hidden: {
      x: "-50%",
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      x: "-50%",
      y: "-50%",
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      x: "-50%",
      y: "100vh",
      opacity: 0,
    },
  };

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => {
        console.log("exit complete");
      }}
    >
      {props.open && (
        <Backdrop
          onClick={(e) => {
            e.stopPropagation();
            props.handleClose();
          }}
        >
          <motion.div
            variants={DropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`card absolute z-[200] left-1/2 top-1/2 ${className}`}
            {...props}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}

export default Modal;
