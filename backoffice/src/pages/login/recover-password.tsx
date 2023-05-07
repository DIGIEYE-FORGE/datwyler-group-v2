import React from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { useProvider } from "../../components/provider";
import smartContract from "../../assets/images/smart-contract.svg";
import { toast } from "react-toastify";

interface Context {
  setIndex: (index: number) => void;
}

const Step1 = ({ setStep }: { setStep: (step: number) => void }) => {
  const [email, setEmail] = React.useState("");

  return (
    <>
      <p
        className="mt-4"
        style={{
          color: "#8e929b",
          fontFamily: "Work Sans",
          fontStyle: "normal",
          fontWeight: "400",
          fontSize: "16px",
          lineHeight: "22px",
          marginBottom: "20px",
        }}
      >
        Enter your email and we’ll send you instructions to reset your password
      </p>
      <div
        style={{
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div>
          <Input
            style={{
              marginTop: "5px",
              height: "52px",
            }}
            id="password"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
          />
        </div>
        <Button
          disabled={email.length === 0}
          style={{
            height: "52px",
            fontSize: "18px",
            fontWeight: "600",
          }}
          onClick={() => {
            setTimeout(() => {
              setStep(1);
            }, 1500);
          }}
        >
          Send reset password
        </Button>
      </div>
    </>
  );
};
const Step2 = ({ setStep }: { setStep: (step: number) => void }) => {
  const [data, setData] = React.useState({
    password: "",
    confirmPassword: "",
  });

  return (
    <>
      <p
        className="mt-4"
        style={{
          backgroundColor: "#BADBCC",
          color: "#0F5132",
          padding: "16px 0",
          borderRadius: "4px",
          fontFamily: "Work Sans",
          fontStyle: "normal",
          fontSize: "16px",
          lineHeight: "22px",
          marginBottom: "20px",
        }}
      >
        Please create a new password
      </p>
      <div
        style={{
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Input
          style={{
            marginTop: "5px",
            height: "52px",
          }}
          type="password"
          onChange={(e) => {
            setData({
              ...data,
              password: e.target.value,
            });
          }}
          placeholder="Password"
        />
        <Input
          style={{
            marginTop: "5px",
            height: "52px",
          }}
          type="password"
          onChange={(e) => {
            setData({
              ...data,
              confirmPassword: e.target.value,
            });
          }}
          placeholder="Confirm password"
        />
        <Button
          disabled={
            data.password.length === 0 || data.password !== data.confirmPassword
          }
          style={{
            height: "52px",
            fontSize: "18px",
            fontWeight: "600",
          }}
          onClick={() => {
            setTimeout(() => {
              toast.success("Password updated successfully");
            }, 1000);
          }}
        >
          Send reset password
        </Button>
      </div>
    </>
  );
};

const RecoverPassword = () => {
  const context = useProvider<Context>();
  const [step, setStep] = React.useState(0);
  const setIndex = context.setIndex;
  return (
    <div className="form ">
      <img src={smartContract} height={172} alt="" />
      <div className="title">
        <div
          style={{
            fontWeight: "600",
            fontSize: "24px",
            textTransform: "capitalize",
          }}
        >
          Recover your password
        </div>
      </div>
      {step === 0 ? <Step1 setStep={setStep} /> : <Step2 setStep={setStep} />}
      <div className="text-center mt-4">
        Go back
        <span
          className="dont-have-acount"
          onClick={() => {
            setIndex(0);
          }}
        >
          {" "}
          Login
        </span>
      </div>
    </div>
  );
};

export default RecoverPassword;
