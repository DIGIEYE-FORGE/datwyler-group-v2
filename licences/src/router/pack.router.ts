import express from 'express';
import { createlicenseController, getAlllicenseController, getlicenseController, updatedlicenseController } from '../controller/license.controller';
import { createPackServiceController, deletePackController, getPackController, getPacksController, updatePackController } from '../controller/pack.controller';
import { deletePackService } from '../services/pack.service';


const routerPack= express.Router();

routerPack.get('/',getPacksController);
routerPack.get('/:id', getPackController);
routerPack.post('/', createPackServiceController);
routerPack.patch('/:id', updatePackController);
routerPack.delete('/:id', deletePackController);

export default routerPack;
