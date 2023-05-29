import pg from "pg";
import "dotenv/config.js";

const { Pool } = pg;

const dbConfiguration = {
  connectionString: process.env.DATABASE_URL
};

if (process.env.MODE === "prod") dbConfiguration.ssl = true;

export const db = new Pool(dbConfiguration);