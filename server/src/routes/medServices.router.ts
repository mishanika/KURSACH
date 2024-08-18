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
    router.route("/order").post(this.medServicesController.order);
    router.route("/orders").get(this.medServicesController.getOrders);
    router.route("/delete-order").post(this.medServicesController.deleteOrder);

    return router;
  }
}

export default MedServicesRouter;
