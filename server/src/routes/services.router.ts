import express from "express";
import ServicesController from "../controllers/services.controller";

class ServicesRouter {
  servicesController: ServicesController;

  constructor(servicesController: ServicesController) {
    this.servicesController = servicesController;
  }

  getRouter() {
    const router = express.Router();
    router.route("/").get(this.servicesController.get);
    router.route("/create").post(this.servicesController.create);
    router.route("/update").post(this.servicesController.update);
    router.route("/delete").post(this.servicesController.delete);
    router.route("/order").post(this.servicesController.order);
    router.route("/orders").get(this.servicesController.getOrders);
    router.route("/delete-order").post(this.servicesController.deleteOrder);

    return router;
  }
}

export default ServicesRouter;
