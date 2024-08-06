import MedScheduleController from "../controllers/medSchedule.controller";
import MedScheduleService from "../services/medSchedule.service";
import MedScheduleRouter from "../routes/medSchedule.router";

const medScheduleService = new MedScheduleService();
const medScheduleController = new MedScheduleController(medScheduleService);
const medScheduleRouter = new MedScheduleRouter(medScheduleController);

export const medScheduleModule = {
  service: medScheduleService,
  controller: medScheduleController,
  router: medScheduleRouter.getRouter(),
};
