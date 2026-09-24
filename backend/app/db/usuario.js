//importamos el dbclient
import { dbClient } from "./pool.js";
//un usuario mediante el correo
export async function getOneUsuario(correo){
    const result=await dbClient.query("SELECT * FROM usuarios WHERE correo=$1",[correo]);
    return result.rows[0];
}

//registrar uno nuevo
export async function createUsuario(correo) {
    const result=await dbClient.query("INSERT INTO usuarios(correo) VALUES ($1) RETURNING *",[correo]);

    return result.rows[0];
}