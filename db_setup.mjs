import { execSync } from "child_process";
import pg from "pg";

try {
  const client = new pg.Client({
    user: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "test", // pass your pwd
    host: process.env.DB_HOSTNAME || "localhost",
    port: process.env.PG_PORT || "5432",
  });

  client.connect().then(() => {
    client
      .query('CREATE DATABASE "upshot_analytics"')
      .then(() => {
        console.log("Finished creating database");
        console.log("Running migrations for new db");
        execSync("npm run db:migrate");
        console.log("Finished migrations for new db");
        client.end();
      });
  });
} catch (err) {
  console.log("sth failed");
}
