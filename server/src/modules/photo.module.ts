import PhotoController from "../controllers/photo.controller";
import PhotoService from "../services/photo.service";
import PhotoRouter from "../routes/photo.router";

const photoService = new PhotoService();
const photoController = new PhotoController(photoService);
const photoRouter = new PhotoRouter(photoController);

export const photoModule = {
  service: photoService,
  controller: photoController,
  router: photoRouter.getRouter(),
};
