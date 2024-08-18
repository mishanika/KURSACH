import { Request, Response } from "express";
import PersonnelService from "../services/personnel.service";
import { decode } from "../utils/utils";

class PersonnelController {
  personnelService: PersonnelService;
  constructor(personnelService: PersonnelService) {
    this.personnelService = personnelService;
  }

  get = async (req: Request, res: Response) => {
    try {
      const personnel = await this.personnelService.get();

      if (personnel.code === 200) {
        res
          .status(personnel.code)
          .json({ error: "", accessToken: "", data: personnel.data.personnel });
      } else {
        res.status(personnel.code).json({ error: personnel.error });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const backup = await this.personnelService.create(req.body);

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

  update = async (req: Request, res: Response) => {
    try {
      const backup = await this.personnelService.update(req.body);

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

  delete = async (req: Request, res: Response) => {
    try {
      const backup = await this.personnelService.delete(req.body);

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

export default PersonnelController;
