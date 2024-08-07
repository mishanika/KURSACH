import { ServiceResponse } from "../types";

import database from "../database/database";

class ServicesService {
  get = async (): Promise<ServiceResponse> => {
    const services = (
      await database.query(`
      SELECT * FROM Services`)
    ).recordset;
    return {
      error: "",
      code: 200,
      accessToken: "",
      data: { services: services },
    };
  };

  create = async (): Promise<ServiceResponse> => {
    // await database.query(`
    //   INSERT INTO Services (name, surname, date_of_birth, address, number, email, photo, password, type, accessToken, refreshToken)
    //   VALUES ('${name}', '${surname}', NULL, NULL, '${number}', '${email}', NULL, '${password}', '${
    //   isAdmin ? type : "client"
    // }', NULL, NULL)`);
    return { error: "", code: 200, accessToken: "", data: {} };
  };

  update = async (): Promise<ServiceResponse> => {
    // await database.query(`
    //     UPDATE Services SET accessToken = '${accessToken}', refreshToken = '${refreshToken}' WHERE id = '${user.id}'`);

    return { error: "", code: 200, accessToken: "", data: {} };
  };

  delete = async (): Promise<ServiceResponse> => {
    // await database.query(`
    //     DELETE FROM Services WHERE id = '${user.id}'`);

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

    const services = (
      await database.query(`
      INSERT INTO ClientRoom VALUES (${clientId}, ${roomId})`)
    ).recordset;

    return { error: "", code: 200, accessToken: "", data: {} };
  };
}

export default ServicesService;
