import { Pool } from "pg";

export const dbClient = new Pool({
    host: "db",
    port: 5432,
    user: "backend_user",
    password: "password-super-secreta",
    database: "sistema_finanzas_db",
});
