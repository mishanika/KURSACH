import express from "express";
import DBController from "../controllers/db.controller";
import { upload } from "../modules/multer.module";

class DBRouter {
  DBController: DBController;

  constructor(DBController: DBController) {
    this.DBController = DBController;
  }

  getRouter() {
    const router = express.Router();
    router.route("/backup").get(this.DBController.backup);
    router.route("/restore").post(upload.single("file"), this.DBController.restore);
    router.route("/logs").get(this.DBController.getLogs);

    return router;
  }
}

export default DBRouter;
