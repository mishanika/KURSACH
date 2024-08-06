import { Friend } from "../../../frontend/src/types";
import { decode, makeTokens, readFile, verify } from "../utils/utils";
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

class PersonnelService {
  get = async (): Promise<ServiceResponse> => {
    const personnel = (
      await database.query(`
      SELECT * FROM Personnel`)
    ).recordset;
    return {
      error: "",
      code: 200,
      accessToken: "",
      data: { personnel: personnel },
    };
  };

  create = async (): Promise<ServiceResponse> => {
    return { error: "", code: 200, accessToken: "", data: {} };
  };

  update = async (): Promise<ServiceResponse> => {
    return { error: "", code: 200, accessToken: "", data: {} };
  };

  delete = async (): Promise<ServiceResponse> => {
    return { error: "", code: 200, accessToken: "", data: {} };
  };

  rent = async (roomId: string, clientId: string): Promise<ServiceResponse> => {
    const relations = (
      await database.query(`
      SELECT * FROM ClientRoom WHERE room_id = ${roomId}`)
    ).recordset;

    if (relations.length) {
      return {
        error: "Room is already rented",
        code: 400,
        accessToken: "",
        data: {},
      };
    }

    const personnel = (
      await database.query(`
      INSERT INTO ClientRoom VALUES (${clientId}, ${roomId})`)
    ).recordset;

    return { error: "", code: 200, accessToken: "", data: {} };
  };
}

export default PersonnelService;
