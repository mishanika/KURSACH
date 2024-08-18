import express from "express";
import MealScheduleController from "../controllers/mealSchedule.controller";

class MealScheduleRouter {
  mealScheduleController: MealScheduleController;

  constructor(mealScheduleController: MealScheduleController) {
    this.mealScheduleController = mealScheduleController;
  }

  getRouter() {
    const router = express.Router();
    router.route("/").get(this.mealScheduleController.get);
    router.route("/create").post(this.mealScheduleController.create);
    router.route("/update").post(this.mealScheduleController.update);
    router.route("/delete").post(this.mealScheduleController.delete);

    return router;
  }
}

export default MealScheduleRouter;
