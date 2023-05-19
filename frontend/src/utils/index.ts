type ClassName = { [key: string]: boolean } | string;
export type JsonObject = { [Key in string]?: JsonValue };
export interface JsonArray extends Array<JsonValue> {}
type JsonValue = string | number | boolean | JsonObject | JsonArray | null;
export function classNames(...classes: ClassName[]): string {
  return classes
    .map((c) => {
      if (typeof c === "string") {
        return c;
      }
      return Object.keys(c)
        .filter((k) => c[k])
        .join(" ");
    })
    .join(" ");
}

export type Tab = {
  name: string;
  icon: React.ReactNode;
  component: React.ReactNode;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string | null;
  tenants?: Tenant[];
  [other: string]: any;
};

export type Group = {
  id: number;
  name: string;
  attributes?: {
    lat: number;
    lng: number;
    alerts: number;
    [other: string]: any;
  };
  lastTelemetries?: {
    [other: string]: any;
  };
  [other: string]: any;
};

export type Device = {
  id: string;
  serial: string;
  deviceProfile: {
    name: string;
    [key: string]: any;
  };
  group?: Group;
  _count?: {
    alerts: number;
  };
};

export type LoginState = "idle" | "loading" | "error";

export type Tenant = {
  id: number;
  name: string;
  [other: string]: any;
};

export type ManyResponse<T extends any = any> = {
  results: T[];
  totalResult: number;
};

export function toggleFullScreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else if (document.exitFullscreen) document.exitFullscreen();
}

export function stringify(value: any) {
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

export type Params = {
  pagination: {
    page: number;
    perPage: number;
  };
  where?: JsonObject;
  orderBy?: JsonObject;
  include?: JsonObject;
};

export function convertParams(params: Params) {
  const {
    pagination: { page, perPage },
    where,
    orderBy,
    include,
  } = params;

  return {
    take: perPage,
    skip: (page - 1) * perPage,
    where: stringify(where),
    orderBy: stringify(orderBy),
    include: stringify(include),
  };
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
