import { Friend } from "./../../../frontend/src/types";
import { decode, makeTokens, verify } from "./../utils/utils";
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

class UserService {
  registerUser = async ({
    name,
    surname,
    number,
    email,
    password,
    repPassword,
    type,
    accessToken,
  }: RegisterBody): Promise<ServiceResponse> => {
    const users = (
      await database.query(`
      SELECT * FROM Clients WHERE number = '${number}' OR email = '${email}'`)
    ).recordset as unknown as Client[];

    const registredUser = users.length ? users[0] : false;

    let isAdmin;
    if (type && accessToken) {
      const users = (
        await database.query(`
      SELECT * FROM Clients WHERE accessToken = '${accessToken}'`)
      ).recordset as unknown as Client[];

      const user = users.length ? users[0] : false;

      isAdmin = user && user.type.includes("admin");
    }
    console.log(isAdmin);

    if (!email.length) {
      return { error: "There must be an email", code: 400, accessToken: "" };
    }
    if (!name.length) {
      return { error: "There must be a name", code: 400, accessToken: "" };
    }
    if (!surname.length) {
      return { error: "There must be a surname", code: 400, accessToken: "" };
    }
    if (!isAdmin && (password !== repPassword || !password.length)) {
      return { error: "Password doesn't match", code: 400, accessToken: "" };
    }
    if (registredUser && registredUser.number + "" === number) {
      return {
        error: "There is a user with such a number",
        code: 400,
        accessToken: "",
      };
    }
    if (registredUser && registredUser.email === email) {
      return {
        error: "There is a user with such an email",
        code: 400,
        accessToken: "",
      };
    }

    await database.query(`
      INSERT INTO Clients (name, surname, date_of_birth, address, number, email, photo, password, type, accessToken, refreshToken)
      VALUES ('${name}', '${surname}', NULL, NULL, '${number}', '${email}', NULL, '${password}', '${
      isAdmin ? type : "client"
    }', NULL, NULL)`);

    return { error: "", code: 200, accessToken: "" };
  };

  loginUser = async ({
    login,
    password,
  }: LoginBody): Promise<ServiceResponse> => {
    const users = (
      await database.query(`
      SELECT * FROM Clients WHERE email = '${login}' AND password = '${password}'`)
    ).recordset as unknown as Client[];

    const user = users.length ? users[0] : false;

    if (user && user.email) {
      const { accessToken, refreshToken } = makeTokens(
        user.email,
        user.id + ""
      );

      await database.query(`
        UPDATE Clients SET accessToken = '${accessToken}', refreshToken = '${refreshToken}' WHERE id = '${user.id}'`);

      return {
        error: "",
        code: 200,
        accessToken: accessToken,
        data: { id: user.id },
      };
    }

    return { error: "Invalid login or password", code: 400, accessToken: "" };
  };

  authAdmin = async ({ accessToken }: AuthBody): Promise<ServiceResponse> => {
    const isAccessVerified = await verify(accessToken);
    const decodedToken = decode(accessToken);

    const users = (
      await database.query(`
      SELECT * FROM Clients WHERE id = ${decodedToken.id}`)
    ).recordset as unknown as Client[];

    const user = users.length ? users[0] : false;

    if (
      isAccessVerified &&
      isAccessVerified.isAuth &&
      user &&
      user.type === "admin"
    ) {
      return {
        error: "",
        code: 200,
        accessToken: isAccessVerified.token ? isAccessVerified.token : "",
      };
    }

    return { error: "Permission denied", code: 400, accessToken: "" };
  };

  authUser = async ({ accessToken }: AuthBody): Promise<ServiceResponse> => {
    const isAccessVerified = await verify(accessToken);

    if (isAccessVerified && isAccessVerified.isAuth) {
      return {
        error: "",
        code: 200,
        accessToken: isAccessVerified.token ? isAccessVerified.token : "",
      };
    }

    return { error: "Permission denied", code: 400, accessToken: "" };
  };

  logoutUser = async ({ accessToken }: AuthBody): Promise<ServiceResponse> => {
    const isAccessVerified = await verify(accessToken);
    if (isAccessVerified && isAccessVerified.isAuth) {
      const decodedToken = decode(accessToken);

      await database.query(`
        UPDATE Clients SET accessToken = '', refreshToken = '' WHERE id = '${decodedToken.id}'`);

      return { error: "", code: 200, accessToken: "" };
    }
    return { error: "Internal error while logout", code: 500, accessToken: "" };
  };

  getProfile = async ({
    id,
    accessToken,
  }: ProfileBody): Promise<ServiceResponse> => {
    const isAccessVerified = await verify(accessToken);
    if (isAccessVerified && isAccessVerified.isAuth) {
      const decodedToken = decode(accessToken);

      const users = (
        await database.query(`
      SELECT * FROM Clients WHERE id = ${id}`)
      ).recordset as unknown as Client[];

      const user = users.length ? users[0] : false;

      if (user) {
        return {
          error: "",
          code: 200,
          accessToken: accessToken,
          data: {
            name: user.name,
            surname: user.surname,
            photo: user.photo || "",
            isEditable: `${user.id}` === decodedToken.id,
          },
        };
      } else {
        return {
          error: "",
          code: 400,
          accessToken: accessToken,
          data: {
            name: "No Such",
            surname: "A User",
            photo: "",
            isEditable: false,
          },
        };
      }
    }
    return {
      error: "Internal error while getting profile",
      code: 500,
      accessToken: "",
    };
  };

  editProfile = async ({
    type,
    name,
    surname,
    accessToken,
  }: EditBody): Promise<ServiceResponse> => {
    const isAccessVerified = await verify(accessToken);
    if (isAccessVerified && isAccessVerified.isAuth) {
      const decodedToken = decode(accessToken);

      const users = (
        await database.query(`
      SELECT * FROM Clients WHERE id = ${decodedToken.id}`)
      ).recordset as unknown as Client[];

      const user = users.length ? users[0] : false;

      (
        await database.query(
          `UPDATE Clients SET name = '${name}', surname = '${surname}' WHERE id = '${decodedToken.id}'`
        )
      ).recordset;

      return {
        error: "",
        code: 200,
        accessToken: accessToken,
        data: {
          // type: type,
          name: user ? name : "",
          surname: user ? surname : "",
          photo: user ? user.photo : "",
          // id: uuid(),
          isEditable: user && decodedToken.id === user.id + "",
        },
      };
    }
    return { error: "Internal error while edit", code: 500, accessToken: "" };
  };

  changePhoto = async ({
    photoName,
    accessToken,
  }: EditPhotoBody): Promise<ServiceResponse> => {
    const isAccessVerified = await verify(accessToken);
    if (isAccessVerified && isAccessVerified.isAuth) {
      const decodedToken = decode(accessToken);

      const user = (
        await database.query(`
        SELECT * FROM Clients WHERE id = '${decodedToken.id}'`)
      ).recordset as unknown as Client;

      if (user && user.photo && user.photo.length) {
        const url = user.photo;
        const regex = /\/([^/?]+)\?/;

        await bucket.deleteFiles({
          prefix: `userPhoto/${url.match(regex)![1]}`,
        });
      }

      const photoFile = await bucket.getFiles({
        prefix: `userPhoto/${photoName}`,
      });
      const photoURL = await photoFile[0][0]
        .getSignedUrl({
          action: "read",
          expires: "03-09-2491",
        })
        .then((data) => data[0]);

      // console.log(photoURL);

      await database.query(`
        UPDATE Clients SET photo = '${photoURL}' WHERE id = '${decodedToken.id}'`);

      return {
        error: "",
        code: 200,
        accessToken: accessToken,
        data: {
          name: user ? user.name : "",
          surname: user ? user.surname : "",
          photo: user ? photoURL : "",
          isEditable: user && decodedToken.id === user.id + "",
        },
      };
    }
    return { error: "Internal error while edit", code: 500, accessToken: "" };
  };

  getUsers = async (): Promise<ServiceResponse> => {
    const users = (
      await database.query(`
      SELECT * FROM Clients`)
    ).recordset;
    return { error: "", code: 200, accessToken: "", data: { users: users } };
  };

  update = async ({
    name,
    surname,
    number,
    email,
    password,
    type,
    id,
  }: RegisterBody & { id: string }): Promise<ServiceResponse> => {
    await database.query(`
        UPDATE Clients SET name = '${name}', surname = '${surname}', number = '${number}', email = '${email}', password = '${password}', type = '${type}' WHERE id = ${id}`);
    return { error: "", code: 200, accessToken: "", data: {} };
  };

  delete = async ({ id }: { id: string }): Promise<ServiceResponse> => {
    await database.query(`
      DELETE FROM Clients WHERE id = ${id}`);
    return { error: "", code: 200, accessToken: "", data: {} };
  };
}

export default UserService;
