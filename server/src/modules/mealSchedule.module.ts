import MealScheduleController from "../controllers/mealSchedule.controller";
import MealScheduleService from "../services/mealSchedule.service";
import MealScheduleRouter from "../routes/mealSchedule.router";

const mealScheduleService = new MealScheduleService();
const mealScheduleController = new MealScheduleController(mealScheduleService);
const mealScheduleRouter = new MealScheduleRouter(mealScheduleController);

export const mealScheduleModule = {
  service: mealScheduleService,
  controller: mealScheduleController,
  router: mealScheduleRouter.getRouter(),
};
