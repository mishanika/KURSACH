import { Request, Response } from "express";
import MedScheduleService from "../services/medSchedule.service";
import { decode } from "../utils/utils";

class MedScheduleController {
  medScheduleService: MedScheduleService;
  constructor(medScheduleService: MedScheduleService) {
    this.medScheduleService = medScheduleService;
  }

  get = async (req: Request, res: Response) => {
    try {
      const medSchedules = await this.medScheduleService.get();

      if (medSchedules.code === 200) {
        res
          .status(medSchedules.code)
          .json({
            error: "",
            accessToken: "",
            data: medSchedules.data.medSchedules,
          });
      } else {
        res.status(medSchedules.code).json({ error: medSchedules.error });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const backup = await this.medScheduleService.create();

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
      const backup = await this.medScheduleService.update();

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
      const backup = await this.medScheduleService.delete();

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
      const { medScheduleId, accessToken } = req.body;
      const { id } = decode(accessToken);

      const backup = await this.medScheduleService.rent(medScheduleId, id);

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

export default MedScheduleController;
