import { Request, Response } from "express";
import PhotoService from "../services/photo.service";

class PhotoController {
  photoService: PhotoService;
  constructor(photoService: PhotoService) {
    this.photoService = photoService;
  }

  changePhoto = async (req: Request, res: Response) => {
    try {
      const backup = await this.photoService.changePhoto(req.body);

      if (backup.code === 200) {
        res.status(backup.code).json(backup.data);
      } else {
        res.status(backup.code).json({ error: backup.error });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };
}

export default PhotoController;
