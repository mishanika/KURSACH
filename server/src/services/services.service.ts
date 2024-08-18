import { Service, ServiceResponse } from "../types";

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

  create = async ({
    name,
    description,
    duration,
    price,
    photo,
    category,
  }: Service): Promise<ServiceResponse> => {
    const data = (
      await database.query(`
      INSERT INTO Services (name, description, duration, price, photo, category)
      OUTPUT INSERTED.id
      VALUES ('${name}', '${description}',${duration}, ${price}, '${photo}',' ${category}')`)
    ).recordset;
    return { error: "", code: 200, accessToken: "", data: data[0] };
  };

  update = async ({
    name,
    description,
    duration,
    price,
    photo,
    category,
    id,
  }: Service & { id: string }): Promise<ServiceResponse> => {
    await database.query(`
        UPDATE Services SET name = '${name}', description = '${description}', duration = ${duration}, price = ${price}, photo = '${photo}', category = '${category}' WHERE id = '${id}'`);
    return { error: "", code: 200, accessToken: "", data: {} };
  };

  delete = async ({ id }: { id: string }): Promise<ServiceResponse> => {
    await database.query(`
      DELETE FROM Services WHERE id = ${id}`);
    return { error: "", code: 200, accessToken: "", data: {} };
  };

  order = async (
    serviceId: string,
    clientId: string
  ): Promise<ServiceResponse> => {
    await database.query(`
      INSERT INTO ClientService VALUES (${clientId}, ${serviceId})`);

    return { error: "", code: 200, accessToken: "", data: {} };
  };

  getOrders = async (): Promise<ServiceResponse> => {
    const data = await database.query(`
    SELECT 
    cs.id,
    cs.client_id,
    cs.service_id,
    s.name AS s_name,
    s.photo AS s_photo
    FROM 
        ClientService cs
    JOIN 
        Services s
    ON 
    cs.service_id = s.id;`);

    return { error: "", code: 200, accessToken: "", data: data.recordset };
  };

  deleteOrder = async ({ id }: { id: string }): Promise<ServiceResponse> => {
    await database.query(`
      DELETE FROM ClientService WHERE id = ${id}`);
    return { error: "", code: 200, accessToken: "", data: {} };
  };
}

export default ServicesService;
