import express from "express";
import RoomController from "../controllers/room.controller";

class RoomRouter {
  roomController: RoomController;

  constructor(roomController: RoomController) {
    this.roomController = roomController;
  }

  getRouter() {
    const router = express.Router();
    router.route("/").get(this.roomController.getRooms);
    router.route("/create").post(this.roomController.create);
    router.route("/update").post(this.roomController.update);
    router.route("/delete").post(this.roomController.delete);
    router.route("/rent").post(this.roomController.rent);

    return router;
  }
}

export default RoomRouter;
