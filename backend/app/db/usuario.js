//importamos el dbclient
import { dbClient } from "./pool.js";
//un usuario mediante el correo
export async function getOneUsuario(correo){
    const result=await dbClient.query("SELECT * FROM usuarios WHERE correo=$1",[correo]);
    return result.rows[0];
}

//registrar uno nuevo
export async function createUsuario(correo,nombre,apellido) {
    const result=await dbClient.query("INSERT INTO usuarios(correo,nombre,apellido) VALUES ($1,$2,$3) RETURNING *",[correo,nombre,apellido]);

    return result.rows[0];
}
//al tener registrado puede mostrarse en el inicio su usuario,editar,eliminar
//id del usuario
export async function getOneIdUsuario(id_usuario) {
    const result= await dbClient.query("SELECT id_usuario,correo,nombre,apellido,fecha_registro FROM usuarios WHERE id_usuario=$1",[id_usuario]);
    return result.rows[0];
}
//editar usuario
export async function updateUsuario(id_usuario,nombre,apellido) {
    const result= await dbClient.query("UPDATE usuarios SET nombre=$1,apellido=$2 WHERE id_usuario=$3 RETURNING *",[nombre,apellido,id_usuario]);
    return result.rows[0];
}
//eliminar usuario
export async function deleteUsuario(id_usuario) {
    const result= await dbClient.query("DELETE FROM usuarios WHERE id_usuario=$1 RETURNING id_usuario",[id_usuario]);
    return result.rows[0];
}