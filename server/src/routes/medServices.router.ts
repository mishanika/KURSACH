import express from "express";
import MedServicesController from "../controllers/medServices.controller";

class MedServicesRouter {
  medServicesController: MedServicesController;

  constructor(medServicesController: MedServicesController) {
    this.medServicesController = medServicesController;
  }

  getRouter() {
    const router = express.Router();
    router.route("/").get(this.medServicesController.get);
    router.route("/create").post(this.medServicesController.create);
    router.route("/update").post(this.medServicesController.update);
    router.route("/delete").post(this.medServicesController.delete);
    router.route("/rent").post(this.medServicesController.rent);

    return router;
  }
}

export default MedServicesRouter;
