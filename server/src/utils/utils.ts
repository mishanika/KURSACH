import fs from "fs";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import path from "path";
import database from "../database/database";
import { Client } from "../types";

const SECRET = "VERYSECRETSECRET";
export const url = "http://localhost:3030";

export type Tokens = {
  accessToken: string | undefined;
  refreshToken: string | undefined;
};

export type Payload = {
  id: string;
  username: string;
  exp: number;
};

export const makeTokens = (username: string, id: string) => {
  let accessToken: string | undefined = jwt.sign(
    { id: id, username: username, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
    SECRET,
    { algorithm: "HS256" }
  );
  let refreshToken: string | undefined = jwt.sign(
    { id: id, username: username, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60 * 30 },
    SECRET,
    { algorithm: "HS256" }
  );
  return { accessToken: accessToken, refreshToken: refreshToken };
};

export const verify = async (token: string | undefined) => {
  try {
    if (token) {
      const tokenVerify = jwt.verify(token, SECRET);
      const tokenDecode = jwt.decode(token) as Payload;

      if (tokenDecode) {
        // console.log("try", tokenDecode.exp > Date.now() / 1000);
        return { isAuth: tokenDecode.exp > Date.now() / 1000, token: token };
      }
    }
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      if (token) {
        const decodedToken = jwt.decode(token) as Payload;

        const user = (
          await database.query(`
        SELECT * FROM Clients WHERE id = '${decodedToken.id}'`)
        ).recordset as unknown as Client;

        if (user) {
          const refreshToken = user.refreshToken;
          let refreshTokenDecode;
          if (refreshToken) {
            refreshTokenDecode = jwt.decode(refreshToken) as Payload;
            if (refreshTokenDecode.exp < Date.now() / 1000) {
              return { isAuth: false, token: token };
            }
          }

          const tokens = makeTokens(decodedToken.username, decodedToken.id);

          await database.query(`
        UPDATE Clients SET accessToken = '${tokens.accessToken}', refreshToken = '${tokens.refreshToken}' WHERE id = '${decodedToken.id}'`);

          return { isAuth: true, token: tokens.accessToken };
        }
      }
    }

    return { isAuth: false, token: token };
  }
};

export const decode = (accessToken: string) => {
  const tokenDecode = jwt.decode(accessToken) as Payload;
  return tokenDecode;
};

export const writeFile = (path: string, data: any) => {
  return new Promise((resolve) => {
    fs.writeFile(path, data, resolve);
  });
};

export const uploadFile = (name: string, data: string) => {
  return new Promise((resolve) => {
    fs.writeFile(`${path.join(process.cwd(), "public", "photos", name)}`, data, { encoding: "base64" }, resolve);
  });
};

export const readFile = async (path: string) => {
  return new Promise((resolve) => {
    fs.readFile(path, "utf-8", (err, data) => {
      resolve(data);
    });
  });
};

export const unlinkFile = async (path: string) => {
  return new Promise((resolve) => {
    fs.unlink(path, resolve);
  });
};

// export const filterData = ({ socket, ...rest }: User) => {
//   return rest;
// };

export const deepCopy = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};
