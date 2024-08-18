import { Friend } from "../../../frontend/src/types";
import { decode, makeTokens, readFile, verify } from "../utils/utils";
import {
  AuthBody,
  Client,
  EditBody,
  EditPhotoBody,
  LoginBody,
  Personal,
  ProfileBody,
  RegisterBody,
  ServiceResponse,
} from "../types";
import { v4 as uuid } from "uuid";
import { bucket } from "../firebase/firebase";
import database from "../database/database";

class PersonnelService {
  get = async (): Promise<ServiceResponse> => {
    const personnel = (
      await database.query(`
      SELECT 
    p.id,
    p.name,
    p.surname,
    p.salary,
    p.client_id,
    c.name AS c_name,
    c.surname AS c_surname,
    c.number AS c_number,
    c.email AS c_email
FROM 
    Personnel p
LEFT JOIN 
    Clients c ON p.client_id = c.id;`)
    ).recordset;
    return {
      error: "",
      code: 200,
      accessToken: "",
      data: { personnel: personnel },
    };
  };

  create = async ({
    name,
    surname,
    salary,
    client_id,
  }: Personal): Promise<ServiceResponse> => {
    await database.query(`
      INSERT INTO Personnel (name, surname, salary, client_id)
      VALUES ('${name}', '${surname}',${salary}, ${client_id})`);
    return { error: "", code: 200, accessToken: "", data: {} };
  };

  update = async ({
    name,
    surname,
    salary,
    client_id,
    id,
  }: Personal & { id: string }): Promise<ServiceResponse> => {
    await database.query(`
        UPDATE Personnel SET name = '${name}', surname = '${surname}', salary = ${salary}, client_id = ${client_id} WHERE id = ${id}`);
    return { error: "", code: 200, accessToken: "", data: {} };
  };

  delete = async ({ id }: { id: string }): Promise<ServiceResponse> => {
    await database.query(`
      DELETE FROM Personnel WHERE id = ${id}`);
    return { error: "", code: 200, accessToken: "", data: {} };
  };
}

export default PersonnelService;
