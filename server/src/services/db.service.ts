import { Friend } from "../../../frontend/src/types";
import { decode, makeTokens, readFile, verify } from "../utils/utils";
// import { Tokens, decode, makeTokens, readFile, unlinkFile, verify, writeFile } from "../utils/utils";
import {
  AuthBody,
  Client,
  EditBody,
  EditPhotoBody,
  LoginBody,
  ProfileBody,
  RegisterBody,
  ServiceResponse,
} from "../types";
import { v4 as uuid } from "uuid";
import { bucket } from "../firebase/firebase";
import database from "../database/database";

const backupPath = "G:\\Папка со всем\\дистанционка\\бд\\kursach\\server\\public\\backup.bak";

class DBService {
  backup = async (): Promise<ServiceResponse> => {
    const result = await database.query(`BACKUP DATABASE kursach TO DISK = '${backupPath}'`);
    return { error: "", code: 200, accessToken: "", data: { path: backupPath } };
  };

  restore = async (): Promise<ServiceResponse> => {
    await database.query(`
      USE master;
      ALTER DATABASE kursach SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
      RESTORE DATABASE kursach
      FROM DISK = '${backupPath}'
      WITH REPLACE, RECOVERY;
      ALTER DATABASE kursach SET MULTI_USER;
    `);
    return { error: "", code: 200, accessToken: "" };
  };

  getLogs = async (): Promise<ServiceResponse> => {
    const logs = (
      await database.query(`SELECT 
    F.*, 
    C.name, 
    C.surname, 
    C.email, 
    C.number
    FROM 
    Finances F
    JOIN 
    Clients C ON F.client_id = C.id;`)
    ).recordset;
    logs.forEach((log) => delete log.client_id);
    return { error: "", code: 200, accessToken: "", data: { logs: logs } };
  };
}

export default DBService;
