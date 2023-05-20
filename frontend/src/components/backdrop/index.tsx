import { HTMLMotionProps, motion } from "framer-motion";

function Backdrop(props: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute  inset-0 bg-black bg-opacity-50 overflow-hidden"
      {...props}
    >
      {props.children}
    </motion.div>
  );
}

export default Backdrop;
