import { Request, Response } from "express";
import ServicesService from "../services/services.service";
import { decode } from "../utils/utils";

class ServicesController {
  servicesService: ServicesService;
  constructor(servicesService: ServicesService) {
    this.servicesService = servicesService;
  }

  get = async (req: Request, res: Response) => {
    try {
      const services = await this.servicesService.get();

      if (services.code === 200) {
        res
          .status(services.code)
          .json({ error: "", accessToken: "", data: services.data.servicess });
      } else {
        res.status(services.code).json({ error: services.error });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const backup = await this.servicesService.create();

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
      const backup = await this.servicesService.update();

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
      const backup = await this.servicesService.delete();

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
      const { servicesId, accessToken } = req.body;
      const { id } = decode(accessToken);

      const backup = await this.servicesService.rent(servicesId, id);

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

export default ServicesController;
