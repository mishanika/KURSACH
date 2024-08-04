import DBController from "../controllers/db.controller";
import DBService from "../services/db.service";
import DBRouter from "../routes/db.router";

const dbService = new DBService();
const dbController = new DBController(dbService);
const dbRouter = new DBRouter(dbController);

export const dbModule = {
  service: dbService,
  controller: dbController,
  router: dbRouter.getRouter(),
};
