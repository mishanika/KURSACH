import ServicesController from "../controllers/services.controller";
import ServicesService from "../services/services.service";
import ServicesRouter from "../routes/services.router";

const servicesService = new ServicesService();
const servicesController = new ServicesController(servicesService);
const servicesRouter = new ServicesRouter(servicesController);

export const servicesModule = {
  service: servicesService,
  controller: servicesController,
  router: servicesRouter.getRouter(),
};
