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
          .json({ error: "", accessToken: "", data: services.data.services });
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
      const backup = await this.servicesService.create(req.body);

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
      const backup = await this.servicesService.update(req.body);

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
      const backup = await this.servicesService.delete(req.body);

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

  order = async (req: Request, res: Response) => {
    try {
      const { serviceId, accessToken } = req.body;
      const { id } = decode(accessToken);

      const backup = await this.servicesService.order(serviceId, id);

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

  getOrders = async (req: Request, res: Response) => {
    try {
      const backup = await this.servicesService.getOrders();

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

  deleteOrder = async (req: Request, res: Response) => {
    try {
      const backup = await this.servicesService.deleteOrder(req.body);

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
}

export default ServicesController;
