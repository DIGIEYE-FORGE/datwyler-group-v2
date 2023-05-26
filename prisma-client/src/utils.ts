export const systems = ["UPS", "TEMPERATURE AND HUMIDITY", "COOLING UNIT", "Monitor_IO", "IPDU_A", "IO_Module", "POWER METER"] as const;
export type System = (typeof systems)[number];

export const alarmLevels = ["Notice", "General", "Critical"] as const;
export type AlarmLevel = (typeof alarmLevels)[number];

export const alarmsMap: {
  [system in System]: {
    [type: string]: AlarmLevel;
  };
} = {
  UPS: {
    EPO: "Critical",
    "Rectifier Fault": "Critical",
    "Rectifier Over Temperature": "Critical",
    "Inverter Over temperature": "Critical",
    "Rectifier Over current": "Critical",
    "Auxiliary power 1 fault": "Critical",
    "Auxiliary power 2 fault": "Critical",
    "Input Thyristor failed": "Critical",
    "Discharge Thyristor failed": "Critical",
    "Charge Thyristor failed": "Critical",
    "Fan fault": "Critical",
    "Fan Power fault": "Critical",
    "DC Bus over voltage": "Critical",
    "DC Bus below voltage": "Critical",
    "DC bus unbalance": "Critical",
    "Mains Site Wiring Fault": "Critical",
    "Soft start failed": "Critical",
    "Input Neutral line missing": "Critical",
    "Battery reverse": "Critical",
    "No battery": "Critical",
    "P-Battery Charger fault": "Critical",
    "N-battery charger fault": "Critical",
    "Battery under voltage": "Critical",
    "Battery over voltage": "Critical",
    "Battery low pre-warning": "General",
    "Mains freq.abnormal": "Critical",
    "Mains volt.abnormal": "Critical",
    "Inverter fault": "Critical",
    "Inv.IGBT bridge shorted": "Critical",
    "Inverter Thyristor short": "Critical",
    "Inverter Thyristor broken": "Critical",
    "Bypass Thyristor short": "Critical",
    "Bypass Thyristor broken": "Critical",
    "CAN comm.Fault": "Critical",
    "Parallel load sharing fault": "Critical",
    "Bypass Site Wiring Fault": "Critical",
    "System Not Sync.To Bypass": "Critical",
    "Bypass unable to trace": "Critical",
    "Bypass Not Available": "Critical",
    "IGBT over current": "Critical",
    "Fuse broken": "Critical",
    "Cable connection error": "Critical",
    "Parallel relay fault": "Critical",
    "LBS Not SYNC": "Critical",
    "Initializtion fault": "Critical",
    "Inverter on invalid": "Critical",
    Overload: "Critical",
    "Parallel Overload": "Critical",
    "DC component over limit": "Critical",
    "Bypass over current": "Critical",
    "Feedback protection": "Critical",
    "BUS volt.abnormal": "Critical",
    "Battery Fault": "Critical",
    "Battery over temperature": "Critical",
    "Fire Alarm": "Critical",
    "Smoke Alarm": "Critical",
    "Machine Type Setting fault": "Critical",
    "Over Preventive Maintenance Time": "Critical",
    Dynamotor: "Critical",
    "INV.Off due to PowerOff": "Critical",
    "INV.Off due to Overload": "Critical",
    "Inverter invalid due to over load": "Critical",
    "UPS In shutdown Due To Overload.": "Critical",
    "UPS In Bypass Due To Overload": "Critical",
    "Parallel in Bypass": "Critical",
    "ShutDown Due To Batt.Low": "Critical",
    "Transfer Times-out": "Critical",
    "Rectifier fault": "Critical",
    "Auxiliary power fault": "Critical",
    "Invert Thyristor failed": "Critical",
    "bypass Thyristor failed": "Critical",
    "DC BUS volt.abnormal": "Critical",
    "Battery Thyristor failed": "Critical",
    "Charger fault": "Critical",
    "Parallel fault": "Critical",
    "Ext.Fire Alarm": "Critical",
    "Ext.Smoke Alarm": "Critical",
    "Communication state": "Critical",
  },
  "TEMPERATURE AND HUMIDITY": {
    "High Temperature State": "Critical",
    "Low Temperature State": "General",
    "High Humidity State": "General",
    "Low Humidity State": "General",
    "Communication State": "Critical",
  },
  "COOLING UNIT": {
    "Low Pressure": "General",
    "FAN Fault": "Critical",
    "Heater Overload": "Critical",
    "Filter Blocked": "General",
    "High Temperature": "Critical",
    "Low Temperature": "General",
    "High Humidity": "General",
    "Low Humidity": "General",
    "Compressor Run Overtime": "General",
    "Return Temp Sensor Fault/ Invalid": "Critical",
    "Supply Temp Sensor Fault/ Invalid": "Critical",
    "Indoor Humid Sensor Fault / Invalid": "General",
    "Pressure Sensor Fault / Invalid": "Critical",
    "Clock": "General",
    "High Pressure": "Critical",
    "Leakage": "Critical",
    "Water Flow": "General",
    "Network Break": "General",
    "Cold Water Cutoff": "Critical",
    "FAN1 Fault": "Critical",
    "FAN2 Fault": "Critical",
    "FAN3 Fault": "Critical",
    "Humidifier Fault": "Critical",
    "Return Temp Sensor Fault / Invalid": "Critical",
    "Cabinet Inlet Temp Sensor 1 Fault / Invalid": "General",
    "Cabinet Inlet Temp Sensor 2 Fault / Invalid": "General",
    "Cabinet Inlet Temp Sensor 3 Fault / Invalid": "General",
    "Cabinet Inlet Temp Sensor 4 Fault / Invalid": "General",
    "Cabinet Inlet Temp Sensor 5 Fault / Invalid": "General",
    "Cabinet Inlet Temp Sensor 6 Fault / Invalid": "General",
    "Smoke / Fire": "Critical",
    "Differential Pressure Switch": "General",
    "Condensated Water Overflow": "General",
    "High Pressure Switch": "General",
    "Exhaust Temp": "General",
    "Condenser Water Flow": "General",
    "Condenser": "General",
    "FAN4 Fault": "Critical",
    "FAN5 Fault": "Critical",
    "FAN6 Fault": "Critical",
    "Compressor Start Fail": "Critical",
    "Compressor Working Range": "General",
    "High Exhaust Temp(BLDC)": "General",
    "Low Differential Pressure": "General",
    "VF Offline": "General",
    "VF state": "General",
    "Suction Pressure Sensor S1 Fault": "Critical",
    "Suction Temp Sensor S2 Fault": "Critical",
    "Suction Pressure Sensor S3 Fault": "Critical",
    "Suction Temp Sensor S4 Fault": "Critical",
    "Low Superheat": "General",
    "Low Evaporating Temp": "General",
    "High Evaporating Temp": "General",
    "High Condensing Temp": "General",
    "Driver Memory Fault": "Critical",
    "Motor of EEV Fault": "Critical",
    "Driver Off Line": "General",
    "Low Suction Temp": "General",
    "EEV Driver Battery Fault": "Critical",
    "Low Suction Pressure": "General",
    "Compressor Need Maintenance": "General",
    "Heater Need Maintenance": "General",
    "FAN Need Maintenance": "General",
    "Humidifier Need Maintenance": "General",
    "Aircon State": "Notice",
    "Communication State": "Critical",
  },
  "Monitor_IO": {
    "Smoke": "Critical",
    "Water Leakage": "Critical",
    "Door": "Notice",
    "Communication state": "Critical",
  },
  "IPDU_A": {
    "Communication State": "Critical",
  },
  "IO_Module": {
    "Communication State": "Critical",
  },
  "POWER METER": {
    "Communication State": "Critical",
  }
};