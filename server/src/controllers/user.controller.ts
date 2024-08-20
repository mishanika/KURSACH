import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
  userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  registerUser = async (req: Request, res: Response) => {
    try {
      const isRegistered = await this.userService.registerUser(req.body);

      if (isRegistered.code === 200) {
        res.status(isRegistered.code).json({ error: "" });
      } else {
        res.status(isRegistered.code).json({ error: isRegistered.error });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };

  loginUser = async (req: Request, res: Response) => {
    try {
      const isLogged = await this.userService.loginUser(req.body);

      if (isLogged.code === 200) {
        res.status(isLogged.code).json({
          error: "",
          accessToken: isLogged.accessToken,
          data: isLogged.data,
        });
      } else {
        res
          .status(isLogged.code)
          .json({ error: isLogged.error, accessToken: isLogged.accessToken });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };

  authUser = async (req: Request, res: Response) => {
    try {
      const isAuth = await this.userService.authUser(req.body);

      if (isAuth.code === 200) {
        res
          .status(isAuth.code)
          .json({ error: "", accessToken: isAuth.accessToken });
      } else {
        res
          .status(isAuth.code)
          .json({ error: isAuth.error, accessToken: isAuth.accessToken });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };

  authAdmin = async (req: Request, res: Response) => {
    try {
      const isAuth = await this.userService.authUser(req.body);

      if (isAuth.code === 200) {
        res
          .status(isAuth.code)
          .json({ error: "", accessToken: isAuth.accessToken });
      } else {
        res
          .status(isAuth.code)
          .json({ error: isAuth.error, accessToken: isAuth.accessToken });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };

  logoutUser = async (req: Request, res: Response) => {
    try {
      const isLogout = await this.userService.logoutUser(req.body);

      if (isLogout.code === 200) {
        res
          .status(isLogout.code)
          .json({ error: "", accessToken: isLogout.accessToken });
      } else {
        res
          .status(isLogout.code)
          .json({ error: isLogout.error, accessToken: isLogout.accessToken });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };

  getProfile = async (req: Request, res: Response) => {
    try {
      const isGot = await this.userService.getProfile(req.body);

      if (isGot.code === 200) {
        res.status(isGot.code).json({
          error: "",
          accessToken: isGot.accessToken,
          data: isGot.data,
        });
      } else {
        res
          .status(isGot.code)
          .json({ error: isGot.error, accessToken: isGot.accessToken });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };

  editProfile = async (req: Request, res: Response) => {
    try {
      const isEdited = await this.userService.editProfile(req.body);

      if (isEdited.code === 200) {
        res.status(isEdited.code).json({
          error: "",
          accessToken: isEdited.accessToken,
          data: isEdited.data,
        });
      } else {
        res
          .status(isEdited.code)
          .json({ error: isEdited.error, accessToken: isEdited.accessToken });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };

  changePhoto = async (req: Request, res: Response) => {
    try {
      const isChanged = await this.userService.changePhoto(req.body);

      if (isChanged.code === 200) {
        res.status(isChanged.code).json({
          error: "",
          accessToken: isChanged.accessToken,
          data: isChanged.data,
        });
      } else {
        res
          .status(isChanged.code)
          .json({ error: isChanged.error, accessToken: isChanged.accessToken });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };

  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getUsers();

      if (users.code === 200) {
        res
          .status(users.code)
          .json({ error: "", accessToken: "", data: users.data.users });
      } else {
        res.status(users.code).json({ error: users.error });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.update(req.body);

      if (users.code === 200) {
        res.status(users.code).json({});
      } else {
        res.status(users.code).json({ error: users.error });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.delete(req.body);

      if (users.code === 200) {
        res.status(users.code).json();
      } else {
        res.status(users.code).json({ error: users.error });
      }
    } catch (err) {
      console.log(err);

      res.status(500).send("Internal server error");
    }
  };
}

export default UserController;
