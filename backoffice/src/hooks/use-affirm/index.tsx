import { useState, useEffect } from "react";
import Modal from "../../components/modal";
import Button from "../../components/button";

const InfoIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.99951 15.9993C9.58176 15.9993 11.1285 15.5301 12.4441 14.651C13.7597 13.772 14.785 12.5225 15.3905 11.0607C15.9961 9.59893 16.1545 7.9904 15.8458 6.43855C15.5371 4.8867 14.7752 3.46124 13.6564 2.34242C12.5375 1.2236 11.1121 0.461671 9.56024 0.152989C8.00839 -0.155693 6.39985 0.00273387 4.93805 0.608235C3.47624 1.21374 2.22681 2.23912 1.34775 3.55471C0.468704 4.8703 -0.000488281 6.41702 -0.000488281 7.99927C0.00180577 10.1203 0.845397 12.1538 2.34519 13.6536C3.84499 15.1534 5.87848 15.997 7.99951 15.9993ZM7.99951 3.3326C8.19729 3.3326 8.39063 3.39125 8.55508 3.50113C8.71953 3.61102 8.8477 3.76719 8.92339 3.94992C8.99908 4.13265 9.01888 4.33371 8.9803 4.52769C8.94171 4.72168 8.84647 4.89986 8.70662 5.03971C8.56677 5.17956 8.38858 5.2748 8.1946 5.31339C8.00062 5.35197 7.79956 5.33217 7.61683 5.25648C7.4341 5.1808 7.27792 5.05262 7.16804 4.88818C7.05816 4.72373 6.99951 4.53039 6.99951 4.3326C6.99951 4.06739 7.10487 3.81303 7.29241 3.6255C7.47994 3.43796 7.7343 3.3326 7.99951 3.3326ZM7.33285 6.66594H7.99951C8.35314 6.66594 8.69227 6.80641 8.94232 7.05646C9.19237 7.30651 9.33285 7.64565 9.33285 7.99927V11.9993C9.33285 12.1761 9.26261 12.3457 9.13758 12.4707C9.01256 12.5957 8.84299 12.6659 8.66618 12.6659C8.48937 12.6659 8.3198 12.5957 8.19477 12.4707C8.06975 12.3457 7.99951 12.1761 7.99951 11.9993V7.99927H7.33285C7.15603 7.99927 6.98647 7.92903 6.86144 7.80401C6.73642 7.67899 6.66618 7.50942 6.66618 7.3326C6.66618 7.15579 6.73642 6.98622 6.86144 6.8612C6.98647 6.73618 7.15603 6.66594 7.33285 6.66594Z"
      fill="#374957"
    />
  </svg>
);

const XIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.06093 6.00023L11.7807 1.28093C12.0737 0.987948 12.0737 0.512936 11.7807 0.219979C11.4878 -0.0730009 11.0127 -0.0730009 10.7198 0.219979L6.00047 4.93977L1.28117 0.219979C0.988192 -0.0730009 0.51318 -0.0730009 0.220223 0.219979C-0.0727333 0.512959 -0.0727568 0.987971 0.220223 1.28093L4.94001 6.00023L0.220223 10.7195C-0.0727568 11.0125 -0.0727568 11.4875 0.220223 11.7805C0.513204 12.0735 0.988215 12.0735 1.28117 11.7805L6.00047 7.06068L10.7198 11.7805C11.0127 12.0735 11.4878 12.0735 11.7807 11.7805C12.0737 11.4875 12.0737 11.0125 11.7807 10.7195L7.06093 6.00023Z"
      fill="#055160"
    />
  </svg>
);

const OkIcon = () => (
  <svg
    width="16"
    height="12"
    viewBox="0 0 16 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.16613 11.775C4.71195 11.7752 4.27638 11.5947 3.9555 11.2733L0.295374 7.6145C-0.098458 7.22054 -0.098458 6.58193 0.295374 6.18797C0.689332 5.79414 1.32794 5.79414 1.72189 6.18797L5.16613 9.63221L14.2781 0.520227C14.6721 0.126396 15.3107 0.126396 15.7046 0.520227C16.0985 0.914185 16.0985 1.55279 15.7046 1.94675L6.37675 11.2733C6.05587 11.5947 5.6203 11.7752 5.16613 11.775Z"
      fill="#055160"
    />
  </svg>
);

interface Props {
  defautlMessage?: string;
}

function useAffirm(
  args: Props | undefined
): [(callback: () => void, t?: string, m?: string) => void, () => JSX.Element] {
  const [open, setOpen] = useState(false);
  const [onAffirm, setOnAffirm] = useState<() => void>(() => () => {});
  const [message, setMessage] = useState<string>(
    args?.defautlMessage || "this action cannot be undone"
  );

  const handleAffirm = () => {
    onAffirm();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const affirm = (callback: () => void, t?: string, m?: string) => {
    setOnAffirm(() => callback);
    if (m) setMessage(m);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) {
      setOnAffirm(() => () => {});
    }
  }, [open]);

  const AffirmModal = () => {
    return (
      <Modal
        open={open}
        style={{
          position: "absolute",
          top: "6rem",
          padding: "0 1rem",
          display: "flex",
          height: "56px",
          alignItems: "center",
          backgroundColor: "#CFF4FC",
          borderRadius: "4px",

          minWidth: "20em",
          gap: "1em",
        }}
      >
        <InfoIcon />
        <p>{message}</p>
        <div className="ml-auto"></div>
        <Button
          variant="text"
          style={{
            padding: "0",
            background: "white",
            width: "32px",
            height: "32px",
            borderRadius: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            handleCancel();
          }}
        >
          <XIcon />
        </Button>
        <Button
          variant="text"
          style={{
            padding: "0",
            background: "white",
            width: "32px",
            height: "32px",
            borderRadius: "32px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            handleAffirm();
          }}
        >
          <OkIcon />
        </Button>
      </Modal>
    );
  };

  return [affirm, AffirmModal];
}

export default useAffirm;
