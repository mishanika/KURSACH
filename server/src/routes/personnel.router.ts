import express from "express";
import PersonnelController from "../controllers/personnel.controller";

class PersonnelRouter {
  personnelController: PersonnelController;

  constructor(personnelController: PersonnelController) {
    this.personnelController = personnelController;
  }

  getRouter() {
    const router = express.Router();
    router.route("/").get(this.personnelController.get);
    router.route("/create").post(this.personnelController.create);
    router.route("/update").post(this.personnelController.update);
    router.route("/delete").post(this.personnelController.delete);

    return router;
  }
}

export default PersonnelRouter;
