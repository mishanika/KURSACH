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
      const backup = await this.personnelService.create();

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
      const backup = await this.personnelService.update();

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
      const backup = await this.personnelService.delete();

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
      const { personnelId, accessToken } = req.body;
      const { id } = decode(accessToken);

      const backup = await this.personnelService.rent(personnelId, id);

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

export default PersonnelController;
