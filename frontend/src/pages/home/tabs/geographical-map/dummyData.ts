import { Group, random } from "../../../../utils";

export function generateGroups(num: number) {
  const groups: Group[] = [];
  for (let i = 0; i < num; i++) {
    groups.push({
      id: i,
      name: `Site ${i + 1}`,
      attributes: {
        lat: random(25, 30) + Math.random(),
        lng: random(55, 60) + Math.random(),
        alerts: random(0, 1) ? random(1, 5) : 0,
        location: "Dubai - UAE - 123456",
      },
      lastTelemetries: {
        Temp: `${random(20, 30)}°c`,
        "UPS load": `${random(20, 30)}KW`,
        Humidity: `${random(20, 30)}%`,
        "Ave load": `${random(20, 30)}kW`,
        Smoke: ["Normal", "Warning", "Danger"][random(0, 2)],
        Energy: `${random(20, 30)}kWH`,
        PDU1: `${random(20, 30)}kWH`,
        PDU2: `${random(20, 30)}kWH`,
      },
    });
  }
  return groups;
}
