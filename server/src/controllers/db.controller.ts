import { Request, Response } from "express";
import DBService from "../services/db.service";

class DBController {
  dbService: DBService;
  constructor(dbService: DBService) {
    this.dbService = dbService;
  }

  backup = async (req: Request, res: Response) => {
    try {
      const backup = await this.dbService.backup();

      if (backup.code === 200) {
        res.status(backup.code).sendFile(backup.data.path);
      } else {
        res.status(backup.code).json({ error: backup.error });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };

  restore = async (req: Request, res: Response) => {
    try {
      const restore = await this.dbService.restore();

      if (restore.code === 200) {
        res.status(restore.code).json({ error: "", accessToken: restore.accessToken, data: restore.data });
      } else {
        res.status(restore.code).json({ error: restore.error, accessToken: restore.accessToken });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };

  getLogs = async (req: Request, res: Response) => {
    try {
      const logs = await this.dbService.getLogs();

      if (logs.code === 200) {
        res.status(logs.code).json({ error: "", accessToken: logs.accessToken, data: logs.data });
      } else {
        res.status(logs.code).json({ error: logs.error, accessToken: logs.accessToken });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };
}

export default DBController;
