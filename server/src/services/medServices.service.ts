import { Friend } from "../../../frontend/src/types";
import { decode, makeTokens, readFile, verify } from "../utils/utils";
import {
  AuthBody,
  Client,
  EditBody,
  EditPhotoBody,
  LoginBody,
  MedService,
  ProfileBody,
  RegisterBody,
  ServiceResponse,
} from "../types";
import { v4 as uuid } from "uuid";
import { bucket } from "../firebase/firebase";
import database from "../database/database";

class MedServicesService {
  get = async (): Promise<ServiceResponse> => {
    const medServices = (
      await database.query(`
      SELECT 
    ms.id,
    ms.name ,
    ms.description,
    ms.duration,
    ms.price,
    ms.photo,
    ms.doctor_id,
    pr.name AS d_name,
    pr.surname AS d_surname
FROM 
    MedServices ms
LEFT JOIN 
    Personnel pr ON ms.doctor_id = pr.id;`)
    ).recordset;
    return {
      error: "",
      code: 200,
      accessToken: "",
      data: { medServices: medServices },
    };
  };

  create = async ({
    name,
    description,
    duration,
    price,
    photo,
    doctor_id,
  }: MedService): Promise<ServiceResponse> => {
    const data = (
      await database.query(`
      INSERT INTO MedServices (name, description, duration, price, photo, doctor_id)
       OUTPUT INSERTED.id
      VALUES ('${name}', '${description}',${duration}, ${price}, '${photo}', ${doctor_id})`)
    ).recordset;
    return { error: "", code: 200, accessToken: "", data: data[0] };
  };

  update = async ({
    name,
    description,
    duration,
    price,
    photo,
    doctor_id,
    id,
  }: MedService & { id: string }): Promise<ServiceResponse> => {
    await database.query(`
        UPDATE MedServices SET name = '${name}', description = '${description}', duration = ${duration}, price = ${price}, doctor_id = ${doctor_id} WHERE id = ${id}`);
    return { error: "", code: 200, accessToken: "", data: {} };
  };

  delete = async ({ id }: { id: string }): Promise<ServiceResponse> => {
    await database.query(`
      DELETE FROM MedServices WHERE id = ${id}`);
    return { error: "", code: 200, accessToken: "", data: {} };
  };

  order = async (medId: string, clientId: string): Promise<ServiceResponse> => {
    const doctor = (
      await database.query(`
      SELECT doctor_id FROM MedServices WHERE id = ${medId};`)
    ).recordset;

    await database.query(`
      INSERT INTO MedClient VALUES (${clientId}, ${medId}, ${doctor[0].doctor_id})`);

    return { error: "", code: 200, accessToken: "", data: {} };
  };

  getOrders = async (): Promise<ServiceResponse> => {
    const data = await database.query(`
    SELECT 
    mc.id,
    mc.client_id,
    mc.med_id,
    mc.doctor_id,
    ms.name AS m_name,
    ms.photo AS m_photo,
    p.name AS d_name,
    p.surname AS d_surname
    FROM 
        MedClient mc
    JOIN 
        MedServices ms
    ON 
        mc.med_id = ms.id
    JOIN 
        Personnel p
    ON 
    mc.doctor_id = p.id;`);

    return { error: "", code: 200, accessToken: "", data: data.recordset };
  };

  deleteOrder = async ({ id }: { id: string }): Promise<ServiceResponse> => {
    await database.query(`
      DELETE FROM MedClient WHERE id = ${id}`);
    return { error: "", code: 200, accessToken: "", data: {} };
  };
}

export default MedServicesService;
