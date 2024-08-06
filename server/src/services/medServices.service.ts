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

class MedServicesService {
  get = async (): Promise<ServiceResponse> => {
    const medServices = (
      await database.query(`
      SELECT * FROM MedServicess`)
    ).recordset;
    return {
      error: "",
      code: 200,
      accessToken: "",
      data: { medServices: medServices },
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
      SELECT * FROM ClientMedServices WHERE room_id = ${roomId}`)
    ).recordset;

    if (relations.length) {
      return {
        error: "MedServices is already rented",
        code: 400,
        accessToken: "",
        data: {},
      };
    }

    const medServices = (
      await database.query(`
      INSERT INTO ClientMedServices VALUES (${clientId}, ${roomId})`)
    ).recordset;

    return { error: "", code: 200, accessToken: "", data: {} };
  };
}

export default MedServicesService;
