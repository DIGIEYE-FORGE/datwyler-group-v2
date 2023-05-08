import Lottie404 from "./404.json";
import Lottie from "react-lottie";
import Button from "../../components/button";
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
function NotFoundPage() {
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Lottie404,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="h-screen w-screen flex flex-col items-center bg-primary/5">
      <Lottie options={defaultOptions} width={800} height={700} />
      <Button
        className="flex gap-2 items-center"
        onClick={() => {
          navigate("/");
        }}
      >
        <span>go bock home</span>
        <IoReturnUpBack className="text-2xl" />
      </Button>
    </div>
  );
}

export default NotFoundPage;
