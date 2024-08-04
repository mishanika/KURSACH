import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import router from "./src/routes";
import database, { sqlConfig } from "./src/database/database";

const app: Express = express();
const port = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());
app.use(router);

database.connect(sqlConfig, (err) => {
  if (err) {
    console.log("Error while connecting database: " + err);
  } else {
    console.log("Connected to database");
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
