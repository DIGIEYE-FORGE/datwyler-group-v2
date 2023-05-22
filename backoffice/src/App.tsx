import "./styles/index.scss";
import "./global.scss";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useReducer, useState } from "react";
import RouterView from "./components/router-view";
import Layout, { Group, Theme } from "./components/layout";
import Provider from "./components/provider";
import { ThemeProvider } from "styled-components";
import groups from "./routes";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import useLocalStorage from "./hooks/use-local-storage";
import i18n from "./i18n";
import axios from "axios";
import { getMe } from "./api/user";
import Lottie from "react-lottie";
import Loading from "./assets/lottie/loading.json";
import {
  QueryClient,
  QueryClientProvider,
  useQueries,
} from "@tanstack/react-query";
import { is } from "date-fns/locale";
// axios.defaults.baseURL = import.meta.env.VITE_BACK_API;
axios.defaults.baseURL = `http://${window.location.hostname}:3001`;

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "accessToken"
)}`;

export type UserContext = {
  user: [any, React.Dispatch<React.SetStateAction<any>>];
  tenantSelected: [number, React.Dispatch<React.SetStateAction<number>>];
};

axios.interceptors.response.use(
  (respone) => {
    return respone;
  },
  function (error) {
    if (error.response.status === 401) {
      const auth = axios.create({
        baseURL: import.meta.env.VITE_AUTH_AUTH,
      });
      auth
        .post("/refresh", {
          refreshToken: localStorage.getItem("refreshToken"),
        })
        .then((res) => {
          localStorage.setItem("accessToken", res.data.accessToken);
        })
        .catch((err) => {
          toast.error("Please login first");
          // window.location.href = "/login";
        });
    }
    return Promise.reject(error);
  }
);
const theme: Theme = {
  mode: "light",
  palette: {
    primary: "#0B2464",
    secondary: "#DEE2E6",
    success: "#00B38B",
    warning: "#FFC107",
    danger: "#F44336",
    info: "#4587EA",
  },
  light: {
    background: "#F5F5F5",
    text: "#07485E",
  },
  dark: {
    background: "#07485E",
    text: "#F2F2F2",
  },
};

interface Params {
  user: {};
  tenantSelected: number;
}

type Type = "user" | "tenantSelected";

function paramsReducer(
  state: Params,
  action: { type: Type; payload: any }
): Params {
  switch (action.type) {
    case "user":
      return { ...state, user: action.payload };
    case "tenantSelected":
      return { ...state, tenantSelected: action.payload };
    default:
      throw new Error("Invalid action type");
  }
}

export const getUserConnecter = async () => {
  try {
    const data = await getMe();
    return data;
  } catch (err) {
    console.log("error", err);
    // window.location.href = "/login";
  }
};
function App() {
  const [tenantSelected, setTenantSelected] = useState<number>(0);
  axios.defaults.headers.common["Tenant-Id"] =
    tenantSelected > 0 ? tenantSelected : localStorage.getItem("tenantId");
  const [lang, setLang] = useLocalStorage("lang", "en");
  const [user, setUser] = useState<any>({});
  const [islogin, setIslogin] = useState<boolean>(false);

  const [getUserQuery] = useQueries({
    queries: [
      {
        queryKey: ["user", islogin],
        queryFn: () => getMe(),
        onSuccess: (data: any) => {
          setUser(data);
          if (data.tenants.length > 0) {
            setTenantSelected(data?.tenants?.[0]?.id);
            localStorage.setItem("tenantId", data?.tenants?.[0]?.id);
          }
        },
        enabled: islogin,
      },
    ],
  });

  useEffect(() => {
    if (
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/signup"
    ) {
      setIslogin(true);
    } else {
      setIslogin(false);
    }
  }, []);

  const location = useLocation();
  const [params, dispatch] = useReducer(paramsReducer, {
    user: {},
    tenantSelected: 0,
  });
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/signup") {
      const user = localStorage.getItem("accessToken");
      if (!user) {
        localStorage.clear();
        toast.error("Please login first");
        // window.location.href = "/login";
      }
    }
  }, [location.pathname]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider
          value={{
            lang: [lang, setLang],
            user: [user, setUser],
            tenantSelected: [tenantSelected, setTenantSelected],
          }}
        >
          <div className="h-screen w-screen">
            {location.pathname !== "/login" &&
            location.pathname !== "/signup" ? (
              <>
                {/* {getUserQuery.isLoading && location.pathname != "/" ? (
                  <div className="h-screen w-screen flex justify-center align-center">
                    <Lottie
                      options={{
                        loop: true,
                        autoplay: true,
                        animationData: Loading,
                      }}
                      height={600}
                      width={600}
                    />
                  </div>
                ) : ( */}
                <Layout groups={groups}>
                  <RouterView />
                </Layout>
                {/* )} */}
              </>
            ) : (
              <RouterView />
            )}
          </div>
        </Provider>
        <ToastContainer theme="colored" />
      </ThemeProvider>
    </>
  );
}

export default App;
