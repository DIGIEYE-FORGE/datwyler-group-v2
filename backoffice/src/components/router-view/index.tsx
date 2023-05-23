import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/home";
import DevicesPage from "../../pages/devices";
import NotFoundPage from "../../pages/not-found";
import DeviceProfilePage from "../../pages/device-profile";
import DecoderPage from "../../pages/decoder";
import DevPage from "../../pages/dev";
import LoginPage from "../../pages/login";
import GroupPage from "../../pages/group";
import SignUpPage from "../../pages/signup";
import FilePage from "../../pages/file";
import User from "../../pages/users";
import TenantPage from "../../pages/tenant";
const RouterView = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/devices" element={<DevicesPage />} />
      <Route path="/device-profile" element={<DeviceProfilePage />} />
      <Route path="/decoder" element={<DecoderPage />} />
      <Route path="/dev" element={<DevPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/groups" element={<GroupPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/files" element={<FilePage />} />
      <Route path="/users" element={<User />} />
      <Route path="/tenants" element={<TenantPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RouterView;
