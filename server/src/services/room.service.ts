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
  Room,
  ServiceResponse,
} from "../types";
import { v4 as uuid } from "uuid";
import { bucket } from "../firebase/firebase";
import database from "../database/database";

class RoomsService {
  getRooms = async (): Promise<ServiceResponse> => {
    const rooms = (
      await database.query(`
      SELECT * FROM Rooms`)
    ).recordset;
    return { error: "", code: 200, accessToken: "", data: { rooms: rooms } };
  };

  create = async ({
    number,
    type,
    description,
    price,
    photo,
  }: Room): Promise<ServiceResponse> => {
    const data = (
      await database.query(`
      INSERT INTO Rooms (number, type, description, price, photo)
      OUTPUT INSERTED.id
      VALUES (${number}, '${type}', '${description}', ${price}, '${photo}')`)
    ).recordset;
    return { error: "", code: 200, accessToken: "", data: data[0] };
  };

  update = async ({
    number,
    type,
    description,
    price,
    photo,
    id,
  }: Room & { id: string }): Promise<ServiceResponse> => {
    await database.query(`
        UPDATE Rooms SET number = ${number}, description = '${description}', type = '${type}', price = ${price}, photo = '${photo}' WHERE id = '${id}'`);
    return { error: "", code: 200, accessToken: "", data: {} };
  };

  delete = async ({ id }: { id: string }): Promise<ServiceResponse> => {
    await database.query(`
      DELETE FROM Rooms WHERE id = ${id}`);
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

    const rooms = (
      await database.query(`
      INSERT INTO ClientRoom VALUES (${clientId}, ${roomId})`)
    ).recordset;

    return { error: "", code: 200, accessToken: "", data: {} };
  };

  getRents = async (): Promise<ServiceResponse> => {
    const data = await database.query(`
    SELECT 
    cr.id,
    cr.client_id,
    cr.room_id,
    r.number as r_number,
    r.photo as r_photo
    FROM 
        ClientRoom cr
    JOIN 
        Rooms r
    ON 
    cr.room_id = r.id;`);

    return { error: "", code: 200, accessToken: "", data: data.recordset };
  };

  deleteRent = async ({ id }: { id: string }): Promise<ServiceResponse> => {
    console.log(id);
    await database.query(`
      DELETE FROM ClientRoom WHERE id = ${id}`);
    return { error: "", code: 200, accessToken: "", data: {} };
  };
}

export default RoomsService;
