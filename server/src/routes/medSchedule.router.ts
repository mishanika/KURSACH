import express from "express";
import MedScheduleController from "../controllers/medSchedule.controller";

class MedScheduleRouter {
  medScheduleController: MedScheduleController;

  constructor(medScheduleController: MedScheduleController) {
    this.medScheduleController = medScheduleController;
  }

  getRouter() {
    const router = express.Router();
    router.route("/").get(this.medScheduleController.get);
    router.route("/create").post(this.medScheduleController.create);
    router.route("/update").post(this.medScheduleController.update);
    router.route("/delete").post(this.medScheduleController.delete);
    router.route("/rent").post(this.medScheduleController.rent);

    return router;
  }
}

export default MedScheduleRouter;
