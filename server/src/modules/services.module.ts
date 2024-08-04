import RoomController from "../controllers/room.controller";
import RoomService from "../services/room.service";
import RoomRouter from "../routes/room.router";

const roomService = new RoomService();
const roomController = new RoomController(roomService);
const roomRouter = new RoomRouter(roomController);

export const roomModule = {
  service: roomService,
  controller: roomController,
  router: roomRouter.getRouter(),
};
