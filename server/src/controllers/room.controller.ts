import { Request, Response } from "express";
import RoomService from "../services/room.service";
import { decode } from "../utils/utils";

class RoomController {
  roomService: RoomService;
  constructor(roomService: RoomService) {
    this.roomService = roomService;
  }

  getRooms = async (req: Request, res: Response) => {
    try {
      const rooms = await this.roomService.getRooms();

      if (rooms.code === 200) {
        res
          .status(rooms.code)
          .json({ error: "", accessToken: "", data: rooms.data.rooms });
      } else {
        res.status(rooms.code).json({ error: rooms.error });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const backup = await this.roomService.create(req.body);

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
      const backup = await this.roomService.update(req.body);

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
      const backup = await this.roomService.delete(req.body);

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
      const { roomId, accessToken } = req.body;
      const { id } = decode(accessToken);

      const backup = await this.roomService.rent(roomId, id);

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

  getRents = async (req: Request, res: Response) => {
    try {
      const backup = await this.roomService.getRents();

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

  deleteRent = async (req: Request, res: Response) => {
    try {
      const backup = await this.roomService.deleteRent(req.body);

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

export default RoomController;
