import express from "express";
import UserController from "../controllers/user.controller";

class UserRouter {
  userController: UserController;

  constructor(userController: UserController) {
    this.userController = userController;
  }

  getRouter() {
    const router = express.Router();
    router.route("/").get(this.userController.getUsers);
    router.route("/register").post(this.userController.registerUser);
    router.route("/login").post(this.userController.loginUser);
    router.route("/auth").post(this.userController.authUser);
    router.route("/auth/isAdmin").post(this.userController.authAdmin);
    router.route("/logout").post(this.userController.logoutUser);
    router.route("/profile").post(this.userController.getProfile);
    router.route("/edit").post(this.userController.editProfile);
    router.route("/edit/photo").post(this.userController.changePhoto);
    router.route("/update").post(this.userController.update);
    router.route("/delete").post(this.userController.delete);

    return router;
  }
}

export default UserRouter;
