import MedServicesController from "../controllers/medServices.controller";
import MedServicesService from "../services/medServices.service";
import MedServicesRouter from "../routes/medServices.router";

const medServicesService = new MedServicesService();
const medServicesController = new MedServicesController(medServicesService);
const medServicesRouter = new MedServicesRouter(medServicesController);

export const medServicesModule = {
  service: medServicesService,
  controller: medServicesController,
  router: medServicesRouter.getRouter(),
};
