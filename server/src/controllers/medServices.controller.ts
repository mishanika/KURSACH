import { Request, Response } from "express";
import MedServicesService from "../services/medServices.service";
import { decode } from "../utils/utils";

class MedServicesController {
  medServicesService: MedServicesService;
  constructor(medServicesService: MedServicesService) {
    this.medServicesService = medServicesService;
  }

  get = async (req: Request, res: Response) => {
    try {
      const medServices = await this.medServicesService.get();

      if (medServices.code === 200) {
        res.status(medServices.code).json({
          error: "",
          accessToken: "",
          data: medServices.data.medServices,
        });
      } else {
        res.status(medServices.code).json({ error: medServices.error });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const backup = await this.medServicesService.create();

      if (backup.code === 200) {
        res.status(backup.code).json();
      } else {
        res.status(backup.code).json({ error: backup.error });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const backup = await this.medServicesService.update();

      if (backup.code === 200) {
        res.status(backup.code).json();
      } else {
        res.status(backup.code).json({ error: backup.error });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const backup = await this.medServicesService.delete();

      if (backup.code === 200) {
        res.status(backup.code).json();
      } else {
        res.status(backup.code).json({ error: backup.error });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };

  rent = async (req: Request, res: Response) => {
    try {
      const { medServicesId, accessToken } = req.body;
      const { id } = decode(accessToken);

      const backup = await this.medServicesService.rent(medServicesId, id);

      if (backup.code === 200) {
        res.status(backup.code).json("");
      } else {
        res.status(backup.code).json({ error: backup.error });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };
}

export default MedServicesController;
