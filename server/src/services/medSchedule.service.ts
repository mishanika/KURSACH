import { Friend } from "../../../frontend/src/types";
import { decode, makeTokens, readFile, verify } from "../utils/utils";
import {
  AuthBody,
  Client,
  EditBody,
  EditPhotoBody,
  LoginBody,
  MedSchedule,
  ProfileBody,
  RegisterBody,
  ServiceResponse,
} from "../types";
import { v4 as uuid } from "uuid";
import { bucket } from "../firebase/firebase";
import database from "../database/database";

class MedScheduleService {
  get = async (): Promise<ServiceResponse> => {
    const medSchedules = (
      await database.query(`
     SELECT 
    ms.id,
    ms.start,
    ms.[end],
    ms.procedure_id,
    ms.doctor_id,
    ps.name AS p_name,
    ps.description AS p_description,
    ps.duration AS p_duration,
    ps.price AS p_price,
    ps.photo AS p_photo,
    pr.name AS d_name,
    pr.surname AS d_surname
FROM 
    MedSchedule ms
JOIN 
    MedServices ps ON ms.procedure_id = ps.id
LEFT JOIN 
    Personnel pr ON ms.doctor_id = pr.id;`)
    ).recordset;

    return {
      error: "",
      code: 200,
      accessToken: "",
      data: { medSchedules: medSchedules },
    };
  };

  create = async ({
    start,
    end,
    procedure_id,
    doctor_id,
  }: MedSchedule): Promise<ServiceResponse> => {
    await database.query(`
      INSERT INTO MedSchedule (start, end, procedure_id, doctor_id)
      VALUES ('${start}','${end}', ${procedure_id}, ${doctor_id})`);
    return { error: "", code: 200, accessToken: "", data: {} };
  };

  update = async ({
    date,
    start,
    end,
    procedure_id,
    doctor_id,
    id,
  }: MedSchedule & { id: string }): Promise<ServiceResponse> => {
    await database.query(`
        UPDATE MedSchedule SET start = '${start}', end = '${end}', procedure_id = ${procedure_id}, doctor_id = ${doctor_id} WHERE id = ${id}`);
    return { error: "", code: 200, accessToken: "", data: {} };
  };

  delete = async ({ id }: { id: string }): Promise<ServiceResponse> => {
    await database.query(`
      DELETE FROM MedSchedule WHERE id = ${id}`);
    return { error: "", code: 200, accessToken: "", data: {} };
  };

  // rent = async (roomId: string, clientId: string): Promise<ServiceResponse> => {
  //   const relations = (
  //     await database.query(`
  //     SELECT * FROM ClientRoom WHERE room_id = ${roomId}`)
  //   ).recordset;

  //   if (relations.length) {
  //     return {
  //       error: "Room is already rented",
  //       code: 400,
  //       accessToken: "",
  //       data: {},
  //     };
  //   }

  //   const rooms = (
  //     await database.query(`
  //     INSERT INTO ClientRoom VALUES (${clientId}, ${roomId})`)
  //   ).recordset;

  //   return { error: "", code: 200, accessToken: "", data: {} };
  // };
}

export default MedScheduleService;
