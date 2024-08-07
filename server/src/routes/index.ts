import express from "express";
import { userModule } from "../modules/user.module";
import { dbModule } from "../modules/db.module";
import { roomModule } from "../modules/room.module";
import { personnelModule } from "../modules/personnel.module";
import { servicesModule } from "../modules/services.module";
import { medServicesModule } from "../modules/medServices.module";
import { mealScheduleModule } from "../modules/mealSchedule.module";
import { medScheduleModule } from "../modules/medSchedule.module";

const router = express.Router();

router.use("/user", userModule.router);
router.use("/db", dbModule.router);
router.use("/room", roomModule.router);
router.use("/personnel", personnelModule.router);
router.use("/services", servicesModule.router);
router.use("/med-services", medServicesModule.router);
router.use("/meal-schedule", mealScheduleModule.router);
router.use("/med-schedule", medScheduleModule.router);

export default router;
