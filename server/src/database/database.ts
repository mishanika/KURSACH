import database, { ConnectionPool } from "mssql/msnodesqlv8";

export const sqlConfig: database.config = {
  server: "DESKTOP-E56NCP9",
  driver: "msnodesqlv8",
  database: "kursach",
  user: "Misha",
  password: "qwe",
  options: {
    trustedConnection: true,
  },
};
export const pool = new ConnectionPool(sqlConfig);

export default database;
