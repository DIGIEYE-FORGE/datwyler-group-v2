import express from 'express';
import { createlicenseController, getAlllicenseController } from './controller/license.controller';
import bodyParser from 'body-parser';
import routerLicense from './router/licence.router';
import main from './grpc/grpc';
import env from './type_env';
import routerPack from './router/pack.router';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/license", routerLicense);
app.use("/pack", routerPack);
main();
app.listen(env.HTTP_PORT, () => {
  console.log('Server is running on port 2000');
});
