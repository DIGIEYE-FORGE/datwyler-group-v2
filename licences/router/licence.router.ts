import express from 'express';
import { createlicenseController, getAlllicenseController, getlicenseController, updatedlicenseController } from '../controller/license.controller';


const routerLicense = express.Router();

routerLicense.get('/', getAlllicenseController);
routerLicense.get('/:id', getlicenseController);
routerLicense.post('/', createlicenseController);
routerLicense.patch('/:id', updatedlicenseController);

export default routerLicense;
