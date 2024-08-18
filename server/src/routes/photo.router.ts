import express from "express";
import PhotoController from "../controllers/photo.controller";
import { upload } from "../modules/multer.module";

class PhotoRouter {
  photoController: PhotoController;

  constructor(photoController: PhotoController) {
    this.photoController = photoController;
  }

  getRouter() {
    const router = express.Router();
    router.route("/change").post(this.photoController.changePhoto);

    return router;
  }
}

export default PhotoRouter;
