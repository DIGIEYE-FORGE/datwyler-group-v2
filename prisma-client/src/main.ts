import { PrismaClient as AuthClient } from "./auth-client";
import { PrismaClient as BackendClient } from "./backend-client";
import {
  PrismaClient as MultitenancyClient,
  Role,
  Tenant,
} from "./multitenancy-client";
import { genSalt, hash } from "bcrypt";
import { systems, alarmsMap } from "./utils";
const authClient = new AuthClient();
const backendClient = new BackendClient();
const multitenancyClient = new MultitenancyClient();

type Configuration = {
  host: string;
  port: number;
  oid: string;
  frequency: number;
  devices: {
    serial: string;
    label: string;
    [key: string]: any;
  }[]
}

const config: Configuration[] = [
  {
    "host": "192.168.0.16",
    "port": 4700,
    "oid": "1.3.6.1.4.1.93451.1",
    "frequency": 20,
    "devices": [
      {
        "serial": "345437620945326",
        "label": "ups",
        "keys": [
          {
            "oid": "1.3.6.1.4.1.93451.1.3.1.0",
            "key": "Input Voltage",
            "type": "number",
            "isShowed": true,
            "unite": "V"
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.3.2.0",
            "key": "I/P Fault Voltage",
            "type": "number",
            "isShowed": true,
            "unite": "V"
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.3.3.0",
            "key": "Output Voltage",
            "type": "number",
            "isShowed": true,
            "unite": "V"
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.3.4.0",
            "key": "Load",
            "type": "number",
            "isShowed": true,
            "unite": "%"
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.3.5.0",
            "key": "Input Frequency",
            "type": "number",
            "isShowed": true,
            "unite": "Hz"
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.3.7.0",
            "key": "Temperature",
            "type": "number",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.3.8.0",
            "key": "Utility State",
            "type": "bool",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.3.9.0",
            "key": "Battery Low Voltage",
            "type": "bool",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.3.11.0",
            "key": "Fault State",
            "type": "bool",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.3.13.0",
            "key": "Testing",
            "type": "bool",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.3.14.0",
            "key": "Shutdown Active",
            "type": "bool",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.3.15.0",
            "key": "Buzzer",
            "type": "bool",
            "isShowed": true,
            "unite": ""
          }
        ],
        "alerts": [
          "1.3.6.1.4.1.93450.3.93451.1.8.10001",
          "1.3.6.1.4.1.93450.3.93451.1.10.3",
          "1.3.6.1.4.1.93450.3.93451.1.10.4",
          "1.3.6.1.4.1.93450.3.93451.1.10.5",
          "1.3.6.1.4.1.93450.3.93451.1.10.6",
          "1.3.6.1.4.1.93450.3.93451.1.10.10001",
          "1.3.6.1.4.1.93450.3.93451.1.16.3",
          "1.3.6.1.4.1.93450.3.93451.1.16.4",
          "1.3.6.1.4.1.93450.3.93451.1.16.5",
          "1.3.6.1.4.1.93450.3.93451.1.16.6",
          "1.3.6.1.4.1.93450.3.93451.1.16.10001",
          "1.3.6.1.4.1.93450.3.93451.1.11.3",
          "1.3.6.1.4.1.93450.3.93451.1.18.10001",
          "1.3.6.1.4.1.93450.3.93451.1.11.10001",
          "1.3.6.1.4.1.93450.3.93451.1.13.10001",
          "1.3.6.1.4.1.93450.3.93451.1.3.10001",
          "1.3.6.1.4.1.93450.3.93451.1.17.10001"
        ]
      },
      {
        "serial": "345437620945327",
        "label": "Main Meter",
        "keys": [
          {
            "oid": "1.3.6.1.4.1.93451.1.8.1.0",
            "key": "Phase A voltage",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.2.0",
            "key": "Line voltage  Uca",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.3.0",
            "key": "Phase A current ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.4.0",
            "key": "Phase A active power ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.5.0",
            "key": "Phase A power factor ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.6.0",
            "key": "Phase A reactive power ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.7.0",
            "key": "Phase A apparent power ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.8.0",
            "key": "Phase B voltage",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.9.0",
            "key": "Line voltage  Uab",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.10.0",
            "key": "Phase B current ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.11.0",
            "key": "Phase B active power ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.12.0",
            "key": "Phase B power factor ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.13.0",
            "key": "Phase B reactive power ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.14.0",
            "key": "Phase B apparent power",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.15.0",
            "key": "Phase C voltage",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.16.0",
            "key": "Line voltage  Ubc",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.17.0",
            "key": "Phase C current ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.18.0",
            "key": "Phase C active power ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.19.0",
            "key": "Phase C power factor ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.20.0",
            "key": "Phase C reactive power",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.21.0",
            "key": "Phase C apparent power",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.22.0",
            "key": "Zero-sequence current ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.23.0",
            "key": "Average phase voltage ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.24.0",
            "key": "Average phase current ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.25.0",
            "key": "Frequency ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.26.0",
            "key": "Total active power",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.27.0",
            "key": "Total power factor ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.28.0",
            "key": "Total reactive power ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.29.0",
            "key": "Total apparent power ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.30.0",
            "key": "Import active energy",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.31.0",
            "key": "Export active energy",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.32.0",
            "key": "Import reactive energy",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.33.0",
            "key": "Export reactive energy",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.34.0",
            "key": "PT",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.35.0",
            "key": "CT",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.10001.0",
            "key": "Communication state",
            "type": "",
            "isShow": true,
            "unite": ""
          }
        ],
        "alerts": []
      },
      {
        "serial": "345437620945328",
        "label": "Environment",
        "keys": [
          {
            "oid": "1.3.6.1.4.1.93451.1.11.1.0",
            "key": "Smoke",
            "type": "bool",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.11.2.0",
            "key": "Water Leakage",
            "type": "bool",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.11.3.0",
            "key": "Door",
            "type": "state",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.10.1.0",
            "key": "Temperature #1",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.10.2.0",
            "key": "Humidity #1",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.16.1.0",
            "key": "Temperature #2",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.16.2.0",
            "key": "Humidity #2",
            "type": "",
            "isShowed": true,
            "unite": ""
          }
        ],
        "alerts": []
      },
      {
        "serial": "345437620945329",
        "label": "Aircon",
        "keys": [
          {
            "oid": "1.3.6.1.4.1.93451.1.13.1.0",
            "key": "Return temp sensor fault",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.2.0",
            "key": "Reserved1",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.3.0",
            "key": "Reserved2",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.4.0",
            "key": "Evaporator tube temp sensor fault",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.5.0",
            "key": "Condenser tube temp sensor fault",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.6.0",
            "key": "Reserved5",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.7.0",
            "key": "Return high temp alarm",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.8.0",
            "key": "Return low temp alarm",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.9.0",
            "key": "Condenser high temp alarm",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.10.0",
            "key": "Reserved9",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.11.0",
            "key": "Reserved10",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.12.0",
            "key": "Evaporator anti frozen alarm",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.13.0",
            "key": "Filter screen dirty",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.14.0",
            "key": "Reserved13",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.15.0",
            "key": "Reserved14",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.16.0",
            "key": "Reserved15",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.17.0",
            "key": "Heater overload",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.18.0",
            "key": "Smoke/water leakage",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.19.0",
            "key": "Reserved16",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.20.0",
            "key": "Reserved17",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.21.0",
            "key": "Compressor state",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.22.0",
            "key": "Heater state",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.23.0",
            "key": "External Fan state",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.24.0",
            "key": "Fault state",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.25.0",
            "key": "Blower state",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.26.0",
            "key": "ON/OFF",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.27.0",
            "key": "Fault reset",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.28.0",
            "key": "Manual/Auto",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.29.0",
            "key": "Address",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.30.0",
            "key": "Cooling start temp",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.31.0",
            "key": "Cooling threshold",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.32.0",
            "key": "Heating start temp",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.33.0",
            "key": "High temp alarm value",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.34.0",
            "key": "High temp threshold",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.35.0",
            "key": "Low temp alarm value",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.36.0",
            "key": "Low temp threshold",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.37.0",
            "key": "Evaporator anti frozen temp",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.38.0",
            "key": "Heater",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.39.0",
            "key": "Evaporator anti frozen temp threshold",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.40.0",
            "key": "Condenser protected temp",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.41.0",
            "key": "Condenser protected temp threshold",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.42.0",
            "key": "Heater temp threshold",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.43.0",
            "key": "Power on start",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.44.0",
            "key": "Return temp correction",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.45.0",
            "key": "Evaporator tube temp correction",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.46.0",
            "key": "Condenser tube temp correction",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.47.0",
            "key": "Restore factory settings",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.48.0",
            "key": "Starting delay time",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.49.0",
            "key": "Evaporator anti frozen duration time",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.50.0",
            "key": "Compressor MIN stop time",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.51.0",
            "key": "Compressor MIN run time",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.52.0",
            "key": "Power off delay time",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.53.0",
            "key": "Power on start delay time",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.54.0",
            "key": "Condenser power off delay time",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.55.0",
            "key": "Compressor run time for sensor fault",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.56.0",
            "key": "Compressor stop time for sensor fault",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.57.0",
            "key": "Filter screen maintenance period",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.58.0",
            "key": "Condenser high temp duration time",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.59.0",
            "key": "Heater overload switch",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.60.0",
            "key": "Smoke/water leakage switch",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.61.0",
            "key": "Evaporator temp ",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.62.0",
            "key": "Condenser temp",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.63.0",
            "key": "Filter screen run time",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.64.0",
            "key": "Compressor runtime",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.65.0",
            "key": "Heater runtime",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.66.0",
            "key": "Blower runtime",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.67.0",
            "key": "External fan runtime",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.68.0",
            "key": "Running mode",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.71.0",
            "key": "Unit state",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.76.0",
            "key": "Debug temp",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.77.0",
            "key": "Return temp",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.78.0",
            "key": "Evaporator tube temp",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.79.0",
            "key": "Condenser tube temp",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.10001.0",
            "key": "Communication state",
            "type": "",
            "isShowed": true,
            "unite": ""
          }
        ],
        "alerts": []
      }
    ]
  },
  {
    "host": "192.168.0.11",
    "port": 4700,
    "oid": "1.3.6.1.4.1.93451.1",
    "frequency": 20,
    "devices": [
      {
        "serial": "345437620945330",
        "label": "ups",
        "keys": [
          {
            "oid": "1.3.6.1.4.1.93451.1.3.1.0",
            "key": "Input Voltage",
            "type": "number",
            "isShowed": true,
            "unite": "V"
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.3.2.0",
            "key": "I/P Fault Voltage",
            "type": "number",
            "isShowed": true,
            "unite": "V"
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.3.3.0",
            "key": "Output Voltage",
            "type": "number",
            "isShowed": true,
            "unite": "V"
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.3.4.0",
            "key": "Load",
            "type": "number",
            "isShowed": true,
            "unite": "%"
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.3.5.0",
            "key": "Input Frequency",
            "type": "number",
            "isShowed": true,
            "unite": "Hz"
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.3.7.0",
            "key": "Temperature",
            "type": "number",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.3.8.0",
            "key": "Utility State",
            "type": "bool",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.3.9.0",
            "key": "Battery Low Voltage",
            "type": "bool",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.3.11.0",
            "key": "Fault State",
            "type": "bool",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.3.13.0",
            "key": "Testing",
            "type": "bool",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.3.14.0",
            "key": "Shutdown Active",
            "type": "bool",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.3.15.0",
            "key": "Buzzer",
            "type": "bool",
            "isShowed": true,
            "unite": ""
          }
        ],
        "alerts": [
          "1.3.6.1.4.1.93450.3.93451.1.8.10001",
          "1.3.6.1.4.1.93450.3.93451.1.10.3",
          "1.3.6.1.4.1.93450.3.93451.1.10.4",
          "1.3.6.1.4.1.93450.3.93451.1.10.5",
          "1.3.6.1.4.1.93450.3.93451.1.10.6",
          "1.3.6.1.4.1.93450.3.93451.1.10.10001",
          "1.3.6.1.4.1.93450.3.93451.1.16.3",
          "1.3.6.1.4.1.93450.3.93451.1.16.4",
          "1.3.6.1.4.1.93450.3.93451.1.16.5",
          "1.3.6.1.4.1.93450.3.93451.1.16.6",
          "1.3.6.1.4.1.93450.3.93451.1.16.10001",
          "1.3.6.1.4.1.93450.3.93451.1.11.3",
          "1.3.6.1.4.1.93450.3.93451.1.18.10001",
          "1.3.6.1.4.1.93450.3.93451.1.11.10001",
          "1.3.6.1.4.1.93450.3.93451.1.13.10001",
          "1.3.6.1.4.1.93450.3.93451.1.3.10001",
          "1.3.6.1.4.1.93450.3.93451.1.17.10001"
        ]
      },
      {
        "serial": "345437620945331",
        "label": "Main Meter",
        "keys": [
          {
            "oid": "1.3.6.1.4.1.93451.1.8.1.0",
            "key": "Phase A voltage",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.2.0",
            "key": "Line voltage  Uca",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.3.0",
            "key": "Phase A current ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.4.0",
            "key": "Phase A active power ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.5.0",
            "key": "Phase A power factor ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.6.0",
            "key": "Phase A reactive power ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.7.0",
            "key": "Phase A apparent power ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.8.0",
            "key": "Phase B voltage",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.9.0",
            "key": "Line voltage  Uab",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.10.0",
            "key": "Phase B current ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.11.0",
            "key": "Phase B active power ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.12.0",
            "key": "Phase B power factor ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.13.0",
            "key": "Phase B reactive power ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.14.0",
            "key": "Phase B apparent power",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.15.0",
            "key": "Phase C voltage",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.16.0",
            "key": "Line voltage  Ubc",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.17.0",
            "key": "Phase C current ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.18.0",
            "key": "Phase C active power ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.19.0",
            "key": "Phase C power factor ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.20.0",
            "key": "Phase C reactive power",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.21.0",
            "key": "Phase C apparent power",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.22.0",
            "key": "Zero-sequence current ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.23.0",
            "key": "Average phase voltage ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.24.0",
            "key": "Average phase current ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.25.0",
            "key": "Frequency ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.26.0",
            "key": "Total active power",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.27.0",
            "key": "Total power factor ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.28.0",
            "key": "Total reactive power ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.29.0",
            "key": "Total apparent power ",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.30.0",
            "key": "Import active energy",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.31.0",
            "key": "Export active energy",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.32.0",
            "key": "Import reactive energy",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.33.0",
            "key": "Export reactive energy",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.34.0",
            "key": "PT",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.35.0",
            "key": "CT",
            "type": "",
            "isShow": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.8.10001.0",
            "key": "Communication state",
            "type": "",
            "isShow": true,
            "unite": ""
          }
        ],
        "alerts": []
      },
      {
        "serial": "345437620945332",
        "label": "Environment",
        "keys": [
          {
            "oid": "1.3.6.1.4.1.93451.1.11.1.0",
            "key": "Smoke",
            "type": "bool",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.11.2.0",
            "key": "Water Leakage",
            "type": "bool",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.11.3.0",
            "key": "Door",
            "type": "state",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.10.1.0",
            "key": "Temperature #1",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.10.2.0",
            "key": "Humidity #1",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.16.1.0",
            "key": "Temperature #2",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.16.2.0",
            "key": "Humidity #2",
            "type": "",
            "isShowed": true,
            "unite": ""
          }
        ],
        "alerts": []
      },
      {
        "serial": "345437620945333",
        "label": "Aircon",
        "keys": [
          {
            "oid": "1.3.6.1.4.1.93451.1.13.1.0",
            "key": "Return temp sensor fault",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.2.0",
            "key": "Reserved1",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.3.0",
            "key": "Reserved2",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.4.0",
            "key": "Evaporator tube temp sensor fault",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.5.0",
            "key": "Condenser tube temp sensor fault",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.6.0",
            "key": "Reserved5",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.7.0",
            "key": "Return high temp alarm",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.8.0",
            "key": "Return low temp alarm",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.9.0",
            "key": "Condenser high temp alarm",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.10.0",
            "key": "Reserved9",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.11.0",
            "key": "Reserved10",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.12.0",
            "key": "Evaporator anti frozen alarm",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.13.0",
            "key": "Filter screen dirty",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.14.0",
            "key": "Reserved13",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.15.0",
            "key": "Reserved14",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.16.0",
            "key": "Reserved15",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.17.0",
            "key": "Heater overload",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.18.0",
            "key": "Smoke/water leakage",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.19.0",
            "key": "Reserved16",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.20.0",
            "key": "Reserved17",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.21.0",
            "key": "Compressor state",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.22.0",
            "key": "Heater state",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.23.0",
            "key": "External Fan state",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.24.0",
            "key": "Fault state",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.25.0",
            "key": "Blower state",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.26.0",
            "key": "ON/OFF",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.27.0",
            "key": "Fault reset",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.28.0",
            "key": "Manual/Auto",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.29.0",
            "key": "Address",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.30.0",
            "key": "Cooling start temp",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.31.0",
            "key": "Cooling threshold",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.32.0",
            "key": "Heating start temp",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.33.0",
            "key": "High temp alarm value",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.34.0",
            "key": "High temp threshold",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.35.0",
            "key": "Low temp alarm value",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.36.0",
            "key": "Low temp threshold",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.37.0",
            "key": "Evaporator anti frozen temp",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.38.0",
            "key": "Heater",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.39.0",
            "key": "Evaporator anti frozen temp threshold",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.40.0",
            "key": "Condenser protected temp",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.41.0",
            "key": "Condenser protected temp threshold",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.42.0",
            "key": "Heater temp threshold",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.43.0",
            "key": "Power on start",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.44.0",
            "key": "Return temp correction",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.45.0",
            "key": "Evaporator tube temp correction",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.46.0",
            "key": "Condenser tube temp correction",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.47.0",
            "key": "Restore factory settings",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.48.0",
            "key": "Starting delay time",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.49.0",
            "key": "Evaporator anti frozen duration time",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.50.0",
            "key": "Compressor MIN stop time",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.51.0",
            "key": "Compressor MIN run time",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.52.0",
            "key": "Power off delay time",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.53.0",
            "key": "Power on start delay time",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.54.0",
            "key": "Condenser power off delay time",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.55.0",
            "key": "Compressor run time for sensor fault",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.56.0",
            "key": "Compressor stop time for sensor fault",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.57.0",
            "key": "Filter screen maintenance period",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.58.0",
            "key": "Condenser high temp duration time",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.59.0",
            "key": "Heater overload switch",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.60.0",
            "key": "Smoke/water leakage switch",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.61.0",
            "key": "Evaporator temp ",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.62.0",
            "key": "Condenser temp",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.63.0",
            "key": "Filter screen run time",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.64.0",
            "key": "Compressor runtime",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.65.0",
            "key": "Heater runtime",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.66.0",
            "key": "Blower runtime",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.67.0",
            "key": "External fan runtime",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.68.0",
            "key": "Running mode",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.71.0",
            "key": "Unit state",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.76.0",
            "key": "Debug temp",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.77.0",
            "key": "Return temp",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.78.0",
            "key": "Evaporator tube temp",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.79.0",
            "key": "Condenser tube temp",
            "type": "",
            "isShowed": true,
            "unite": ""
          },
          {
            "oid": "1.3.6.1.4.1.93451.1.13.10001.0",
            "key": "Communication state",
            "type": "",
            "isShowed": true,
            "unite": ""
          }
        ],
        "alerts": []
      }
    ]
  }
]

type CreateUser = {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
};

type CreateTenant = {
  id?: number;
  name: string;
};

type CreateGroup = {
  name: string;
  location: string;
  lat: number;
  lng: number;
  ip: string;
};

type CreateDevice = {
  name: string;
  tenantId: number;
  description: string;
  serial: string;
};

const defaulUser: CreateUser = {
  email: "iseljao@gmail.com",
  password: "12345678",
  firstName: "isel",
  lastName: "jao",
  phoneNumber: "0682712855",
};

const defaulTenant: CreateTenant = {
  name: "datwyler",
};

const descriptions = [
  "HVAC (Heating, Ventilation, and Air Conditioning): HVAC systems are designed to control the temperature, humidity, and air quality within a building or confined space. They provide heating, cooling, and ventilation to maintain a comfortable environment.",
  "CCTV (Closed Circuit Television): CCTV systems are used to monitor and record video footage of a property or building. They are often used for security purposes, but can also be used to monitor traffic flow or other activities.",
  "PABX (Private Automatic Branch Exchange): PABX systems are used to connect multiple phone lines within a building or office. They allow users to make calls between extensions without having to dial an outside number.",
  "Fire Alarm: Fire alarm systems are designed to detect smoke or fire and alert occupants of a building. They can be used to notify the fire department, activate sprinkler systems, or sound an alarm.",
  "Access Control: Access control systems are used to restrict access to a building or area. They can be used to control who enters a building, or to restrict access to certain areas within a building.",
  "Cooling: Cooling systems are used to maintain a comfortable temperature within a building or confined space. They can be used to cool the air, or to remove heat from a space.",
  "Public Address: Public address systems are used to broadcast announcements or music throughout a building or area. They can be used to make announcements in a school, or to play music in a store.",
  "UPS (Uninterruptible Power Supply): UPS systems are used to provide backup power in the event of a power outage. They can be used to keep critical systems running, or to provide power for emergency lighting.",
];

const sites: CreateGroup[] = [
  {
    name: "morroco site",
    // morroco info
    location: "Morocco",
    lat: 31.791702,
    lng: -7.09262,
    ip: "www.google.com",
  },
  {
    name: "ksa site",
    // france info
    location: "Saudi Arabia",
    lat: 23.885942,
    lng: 45.079162,
    ip: "www.google.com",
  },
  {
    name: "uae site",
    // uea info
    location: "United Arab Emirates",
    lat: 23.424076,
    lng: 53.847818,
    ip: "www.google.com",
  },
];

export async function hashPassword(password: string) {
  const saltRounds = 10;
  const salt = await genSalt(saltRounds);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}

async function initUser() {
  return await authClient.user.create({
    data: { ...defaulUser, password: await hashPassword(defaulUser.password) },
  });
}

async function seedDevices({
  tenantId,
  groupIds,
}: {
  tenantId: number;
  groupIds: number[];
}) {
  return Promise.all(
    [...systems].map(async (system, i) =>
      backendClient.device.create({
        data: {
          id: i + 1,
          name: system,
          serial: `serial-${(i + 1).toString().padStart(4, "0")}`,
          tenantId,
          groupId: groupIds[Math.floor(Math.random() * groupIds.length)],
          description: descriptions[i],
          alerts: {
            createMany: {
              data: Object.entries(alarmsMap[system]).map(([type, level]) => ({
                type,
                level,
                message: `This is a ${level} alarm for ${type}`,
              })),
            },
          },
          lastTelemetries: {
            createMany: {
              data: Array.from({ length: 4 }, (_v, i) => ({
                name: [
                  "TEMPERATURE",
                  "HUMIDITY",
                  "POWER",
                  "PRESSURE",
                  "VOLTAGE",
                  "CURRENT",
                ][i],
                value: Math.floor(Math.random() * 100),
              })),
            },
          },
        },
      })
    )
  );
}

async function initTenant(userId: number) {
  return await multitenancyClient.tenant.create({
    data: {
      name: defaulTenant.name,
      users: {
        create: {
          id: userId,
          role: "ADMIN",
        },
      },
    },
  });
}

async function seedSites(tenantId: number) {
  return Promise.all(
    sites.map(async (site) => {
      return await backendClient.group.create({
        data: {
          tenantId,
          ...site,
        },
      });
    })
  );
}

async function addRecord({
  deviceId,
  name,
  value,
}:
  {
    deviceId: number;
    name: string;
    value: number;
  }
) {
  return await backendClient.device.update({
    where: { id: deviceId },
    data: {
      lastTelemetries: {
        upsert: {
          where: { deviceId_name: { deviceId, name } },
          update: { value },
          create: { name, value },
        }
      },
      history: {
        create: {
          name,
          value,
        }
      }
    }
  })

}



async function freshStart() {
  await authClient.user.deleteMany({});
  await multitenancyClient.user.deleteMany({});
  await multitenancyClient.tenant.deleteMany({});
  await backendClient.alert.deleteMany({});
  await backendClient.lastTelemetry.deleteMany({});
  await backendClient.device.deleteMany({});
  await backendClient.group.deleteMany({});
  const user = await initUser();
  const tenant = await initTenant(user.id);
  const sites = await seedSites(tenant.id);
  const devices = await seedDevices({
    tenantId: tenant.id,
    groupIds: sites.map((site) => site.id),
  });
  console.log({ user, tenant, sites, devices });
  await backendClient.group.deleteMany({
    where: {
      OR: [
        { name: "MICRO DC" },
        { name: "Mini  DC" },
      ]
    }
  })
  const site1 = await backendClient.group.create({
    include: { _count: true },
    data: {
      name: "MICRO DC",
      location: "Dubai",
      lat: 25.2048,
      lng: 55.2708,
      tenantId: tenant?.id,
      ip: 'cmsdatwyler.no-ip.org/',
      devices: {
        createMany: {
          data: config[0].devices.map((device) => ({
            name: device.label,
            serial: device.serial,
            tenantId: tenant?.id,
          })),
          skipDuplicates: true,
        }
      }
    }
  })
  const site2 = await backendClient.group.create({
    include: { _count: true },
    data: {
      name: "Mini  DC",
      location: "Dubai",
      lat: 27.2048,
      lng: 55.2708,
      ip: 'cmsdatwyler.no-ip.org:81',
      tenantId: tenant?.id,
      devices: {
        createMany: {
          data: config[1].devices.map((device) => ({
            tenantId: tenant?.id,
            name: device.label,
            serial: device.serial,
          })),
          skipDuplicates: true,
        }
      }
    }
  })

  console.log({ site1, site2 });
  // const alert = await backendClient.alert.findFirst({
  //   where: {
  //     acknowledgedBy: {
  //       not: null
  //     }
  //   }
  // })
  // if (alert)
  //   await backendClient.alert.updateMany({
  //     where: {},
  //     data: {
  //       attributes: alert.attributes || {},
  //       acknowledgedBy: alert.acknowledgedBy,
  //     }
  //   })
  // const device = await backendClient.device.findFirst({
  //   where: {
  //     name: "TEMPERATURE AND HUMIDITY"
  //   }
  // })
  // console.log({ device });
  // if (!device) return;
  // setInterval(async () => {
  //   addRecord({
  //     deviceId: device.id,
  //     name: "TEMPERATURE",
  //     value: Math.floor(Math.random() * 100),
  //   })
  //   addRecord({
  //     deviceId: device.id,
  //     name: "HUMIDITY",
  //     value: Math.floor(Math.random() * 100),
  //   })
  // }, 1000);

  // setInterval(async () => {
  //   // log the current state of the system
  //   const history = await backendClient.history.count();
  //   console.log({ history });

  // }, 1000);

  

}

async function main() {
  freshStart();
}

main()
  .then(async () => {
    await authClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await authClient.$disconnect();
    process.exit(1);
  });
