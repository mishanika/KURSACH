import { Request, Response } from "express";
import MealScheduleService from "../services/mealSchedule.service";
import { decode } from "../utils/utils";

class MealScheduleController {
  mealScheduleService: MealScheduleService;
  constructor(mealScheduleService: MealScheduleService) {
    this.mealScheduleService = mealScheduleService;
  }

  get = async (req: Request, res: Response) => {
    try {
      const mealSchedule = await this.mealScheduleService.get();

      if (mealSchedule.code === 200) {
        res
          .status(mealSchedule.code)
          .json({
            error: "",
            accessToken: "",
            data: mealSchedule.data.mealSchedule,
          });
      } else {
        res.status(mealSchedule.code).json({ error: mealSchedule.error });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const backup = await this.mealScheduleService.create();

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
      const backup = await this.mealScheduleService.update();

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
      const backup = await this.mealScheduleService.delete();

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
      const { mealScheduleId, accessToken } = req.body;
      const { id } = decode(accessToken);

      const backup = await this.mealScheduleService.rent(mealScheduleId, id);

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

export default MealScheduleController;
