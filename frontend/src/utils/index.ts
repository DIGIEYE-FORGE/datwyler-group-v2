type ClassName = { [key: string]: boolean } | string;
export type JsonObject = { [Key in string]?: JsonValue };
export interface JsonArray extends Array<JsonValue> { }
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

export const systems = ["UPS", "TEMPERATURE AND HUMIDITY", "COOLING UNIT", "Monitor_IO", "IPDU_A", "IO_Module", "POWER METER"] as const;
export type System = (typeof systems)[number];

export const alarmLevels = ["Notice", "General", "Critical"] as const;
export type AlarmLevel = (typeof alarmLevels)[number];

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: any | null;
  tenants?: Tenant[];
  [other: string]: any;
};

export type Alert = {
  id: number;
  deviceId: number;
  device?: Device;
  type?: string;
  message?: string;
  level?: AlarmLevel;
  createdAt: string;
  updatedAt: string;
  attributes?: Record<string, string | number | boolean>;
  acknowledgedBy?: number;
  [key: string]: any;
};



export type Group = {
  id: number;
  name: string;
  type: string;
  createdAt?: string;
  updatedAt?: string;
  parentId?: number;
  parent?: Group;
  subgroups?: Group[];
  location?: string;
  lat: number;
  lng: number;
  ip?: string;
  attributes?: Record<string, string | number | boolean>;
  devices?: Device[];
  tenantId?: number;
  alerts: Alert[];
};


export type Report = {
  id: number;
  name: string;
  tenantId: number;
  query?: string;
  type: string;
  format: string;
}
export type ReportDevice = {
  name: string;
  date: Date;
  groups?: number[];
  devices: number[];
  type: "alert" | "mesurement";
  format: "pdf" | "csv";
}
export type LastTelemetry = {
  name: string;
  value: string;
  [key: string]: any;
};

export type Device = {
  id: string;
  name: System;
  serial: string;
  deviceProfile: {
    name: string;
    [key: string]: any;
  };
  group?: Group;
  _count?: {
    alerts: number;
  };
  lastTelemetries?: LastTelemetry[];
  alerts?: Alert[];
};

// devices: {
//   total: totalDevices,
//     online: onlineDevices,
//       },
// criticalAlarms,
//   waterLeakAlarms,
//   doorAlarms,
//   smokeAlarms,
//   upsAlarms,
//   coolingUnitAlarms,

export type DashboardData = {
  devices: {
    total: number;
    online: number;
  };
  criticalAlarms: number;
  waterLeakAlarms: number;
  doorAlarms: number;
  smokeAlarms: number;
  upsAlarms: Alert[];
  coolingUnitAlarms: Alert[];
  [key: string]: any;
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
  where?: Record<string, any>;
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

export function strTake(
  str: string | undefined,
  length = 50,
  more = "...",
  placeholder = "---"
) {
  if (!str) return placeholder;
  if (str.length <= length) return str;
  return str.slice(0, length - 3) + more;
}

export function toFixed<T>(
  number: number | undefined,
  precision = 2,
  defaulValue = 0 as T
): number | T {
  if (!number) return defaulValue;
  return Number(number.toFixed(precision));
}
