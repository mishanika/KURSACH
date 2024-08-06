import PersonnelController from "../controllers/personnel.controller";
import PersonnelService from "../services/personnel.service";
import PersonnelRouter from "../routes/personnel.router";

const personnelService = new PersonnelService();
const personnelController = new PersonnelController(personnelService);
const personnelRouter = new PersonnelRouter(personnelController);

export const personnelModule = {
  service: personnelService,
  controller: personnelController,
  router: personnelRouter.getRouter(),
};
