import { Friend } from "../../../frontend/src/types";
import { decode, makeTokens, readFile, verify } from "../utils/utils";
import {
  AuthBody,
  Client,
  EditBody,
  EditPhotoBody,
  LoginBody,
  MealSchedule,
  ProfileBody,
  RegisterBody,
  ServiceResponse,
} from "../types";
import { v4 as uuid } from "uuid";
import { bucket } from "../firebase/firebase";
import database from "../database/database";

class MealScheduleService {
  get = async (): Promise<ServiceResponse> => {
    const mealSchedule = (
      await database.query(`
      SELECT * FROM MealSchedule`)
    ).recordset;

    return {
      error: "",
      code: 200,
      accessToken: "",
      data: { mealSchedule: mealSchedule },
    };
  };

  create = async ({
    day,
    breakfast,
    dinner,
    supper,
  }: MealSchedule): Promise<ServiceResponse> => {
    await database.query(`
      INSERT INTO MealSchedule (breakfast, dinner, supper, day)
      VALUES ('${breakfast}',${dinner}, ${supper}, ${day})`);
    return { error: "", code: 200, accessToken: "", data: {} };
  };

  update = async ({
    day,
    breakfast,
    dinner,
    supper,
    id,
  }: MealSchedule & { id: string }): Promise<ServiceResponse> => {
    await database.query(`
        UPDATE MealSchedule SET breakfast = '${breakfast}', dinner = '${dinner}', supper = '${supper}', day = '${day}' WHERE id = ${id}`);
    return { error: "", code: 200, accessToken: "", data: {} };
  };

  delete = async ({ id }: { id: string }): Promise<ServiceResponse> => {
    await database.query(`
      DELETE FROM MealSchedule WHERE id = ${id}`);
    return { error: "", code: 200, accessToken: "", data: {} };
  };
}

export default MealScheduleService;
