var mqtt = require('mqtt');
const { PrismaClient } = require('../prisma-client/src/backend-client');
const prisma = new PrismaClient();



var options = {
  host: 'mqtt1.hardiot.com', 
  port: 1883,
  protocol: 'mqtt',
};

var client  = mqtt.connect(options);


client.on('connect', function () {
  console.log('Connected to MQTT broker');
  client.subscribe('datwyler/+', function (err) {
    if (!err) {
      console.log('Successfully subscribed to the topic');
    } else {
      console.error('Failed to subscribe to the topic');
    }
  });
});

client.on('message',async  function (topic, message) {
    try{
    if (topic === "datwyler/lastevent")
    {
    const {serial,key,value} = JSON.parse(message)
    const device = await prisma.device.findUnique({ where: { serial } });
        if (!device) {
            return;
        }
        return await prisma.device.update({
            where: { serial },
            data: {
            lastTelemetries: {
                upsert: {
                where: {
                    deviceId_name: {
                    deviceId: device.id,
                    name: key,
                    },
                },
                update: {
                    value,
                },
                create: {
                    name: key,
                    value,
                },
                },
            },
            },
        });
    }
    else if (topic == "datwyler/addalert"){
        const alert = JSON.parse(message);
        const { serial, ...data } = alert;
        const device = await prisma.device.findUnique({
            where: { serial },
            include: { group: true },
        });
        if (!device) {
            throw new Error('Device not found');
        }
        const res = await prisma.alert.create({
            data: {
            device: {
                connect: {
                serial,
                },
            },
            ...data,
            },
        }); 
    }
    }
    catch(e){
        console.log("error", e);
    }
});

client.on('error', function (err) {
  console.error('Connection error: ' + err);
});

client.on('offline', function() {
  console.log('Client is offline');
});