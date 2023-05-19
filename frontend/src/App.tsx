import { useEffect, useMemo, useState } from "react";
import Provider from "./components/provider";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login2";
import NotFoundPage from "./pages/notfound";
import { LoginState, Tab, Tenant, User } from "./utils";
import useLocalStorage from "./hooks/use-local-storage";
import { useNavigate, useLocation } from "react-router-dom";
import AuthApi from "./api/auth";
import Loader from "./components/loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login2Page from "./pages/login2";
import DevPage from "./pages/dev";
import BackendApi from "./api/backend";

export type AppContext = {
  tabs: Tab[];
  selectedTabs: number[];
  activeTab: number | null;
  selectTab: (index: number) => void;
  closeTab: (index: number) => void;
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  refreshToken: string;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
  rtl: boolean;
  setRtl: React.Dispatch<React.SetStateAction<boolean>>;
  loginState: LoginState;
  setLoginState: React.Dispatch<React.SetStateAction<LoginState>>;
  authApi: AuthApi;
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  tenantId: number | undefined;
  setTenantId: React.Dispatch<React.SetStateAction<number | undefined>>;
  backendApi: BackendApi;
};
type Theme = "light" | "dark" | "hybrid";

function App() {
  const [selectedTabs, setSelectedTabs] = useLocalStorage<number[]>(
    "selectedTabs",
    [0]
  );
  const [activeTab, setActiveTab] = useLocalStorage<number | null>(
    "activeTab",
    0
  );
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "hybrid");

  const [loginState, setLoginState] = useState<LoginState>("loading");
  const [tenantId, setTenantId] = useLocalStorage<number | undefined>(
    "tenantId",
    undefined
  );

  const [user, setUser] = useState<User | null>({
    id: 1,
    firstName: "yassin",
    lastName: "ouraq",
    email: "yassinouraq@email.com",
    avatar:
      "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
  });
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");
  const [rtl, setRtl] = useState(false);
  const authApi = useMemo(
    () =>
      new AuthApi({
        accessToken,
        refreshToken,
      }),
    []
  );

  const backendApi = useMemo(
    () =>
      new BackendApi({
        tenantId,
        accessToken,
        refreshToken,
      }),
    [tenantId, refreshToken, accessToken]
  );

  function selectTab(index: number) {
    setActiveTab(index);
    if (selectedTabs.includes(index)) return;
    setSelectedTabs([...selectedTabs, index]);
  }

  function closeTab(index: number) {
    const newSelectedTabs = selectedTabs.filter((i) => i !== index);
    setSelectedTabs(newSelectedTabs);
    if (newSelectedTabs.length === 0) {
      setActiveTab(null);
      return;
    }
    if (activeTab === index) {
      setActiveTab(newSelectedTabs[newSelectedTabs.length - 1]);
    }
  }
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loginState === "loading") {
      authApi
        .verify()
        .then((u) => {
          if (u.tenants && !u.tenants.find((t: Tenant) => t.id === tenantId))
            setTenantId(u.tenants[0].id);
          setLoginState("idle");
          setUser(u);
        })
        .catch((err) => {
          setLoginState("error");
        });
    }
    if (loginState === "error" && location.pathname !== "/login")
      navigate("/login");

    if (loginState === "idle" && location.pathname === "/login") {
      navigate("/");
    }
  }, [loginState]);

  if (loginState === "loading")
    return (
      <div
        className={`h-screen w-screen flex-center ${
          theme === "dark" && "bg-primary-darker"
        }`}
      >
        <Loader />
      </div>
    );

  return (
    <Provider
      value={{
        selectedTabs,
        activeTab,
        selectTab,
        closeTab,
        user,
        setUser,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        rtl,
        setRtl,
        authApi,
        setLoginState,
        theme,
        setTheme,
        tenantId,
        setTenantId,
        backendApi,
      }}
    >
      <div className={theme}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login2" element={<Login2Page />} />
          <Route path="/dev" element={<DevPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer theme="colored" />
      </div>
    </Provider>
  );
}

export default App;
