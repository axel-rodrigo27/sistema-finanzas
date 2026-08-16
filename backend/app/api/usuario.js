import { Router } from "express";
export const endpointsUsuario=Router();
import { getOneUsuario,createUsuario,getOneIdUsuario,updateUsuario,deleteUsuario} from "../db/usuario.js";

//creamos los endpoints
endpointsUsuario.get("/:correo",async(req,res)=>{
    try{
        const { correo } = req.params;
        if (!correo || correo.trim() === "") {
        return res.status(400).json({ error: "El correo electrónico es obligatorio." });
        }
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(correo.trim())) {
        return res.status(400).json({ error: "El formato del correo no es válido." });
        }

        const correoLimpio = correo.trim().toLowerCase();
        const usuario=await getOneUsuario(correoLimpio);
        if(!usuario){
            return res.status(404).json({mensaje :"El correo no esta registrado. Debe crearse una cuenta."});
        }
        return res.json(usuario);
    }
    catch(error){
        return res.status(500).json({error:"Error del servidor"});
    }
});

endpointsUsuario.post("/", async (req, res) => {
    try {
        const { correo, nombre, apellido } = req.body;

        if (!correo || !nombre || !apellido) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(correo.trim())) {
            return res.status(400).json({ error: "El formato del correo no es válido." });
        }

        const correoLimpio = correo.trim().toLowerCase();
        
        // Verificamos por seguridad que no exista antes de insertar
        const existe = await getOneUsuario(correoLimpio);
        if (existe) {
            return res.status(400).json({ error: "El correo ya se encuentra registrado." });
        }

        const nuevoUsuario = await createUsuario(correoLimpio, nombre.trim(), apellido.trim());
        return res.status(201).json(nuevoUsuario);
    }
    catch (error) {
        return res.status(500).json({ error: "Error del servidor al crear usuario" });
    }
});
//mostrar el usuario mediante el id
endpointsUsuario.get("/perfil/:id",async(req,res)=>{
    try{
        const { id }=req.params;
        const id_usuario=Number(id);
        const usuario=await getOneIdUsuario(id_usuario);
        if(!usuario){
            return res.status(400).json({error:"El id no fue encontrado"});
        }
        return res.status(200).json(usuario);
    }
    catch (error){
        return res.status(500).json({ error: "ERror del servidor al seleccionar el ID"});
    }
});
//modificar usuario
endpointsUsuario.put("/perfil/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido } = req.body;
    const id_usuario = Number(id);

    if (isNaN(id_usuario)) {
      return res.status(400).json({ error: "El ID ingresado no es válido." });
    }

    if (!nombre || !apellido || nombre.trim() === "" || apellido.trim() === "") {
      return res.status(400).json({ error: "Nombre y apellido no pueden estar vacíos." });
    }

    const usuarioEditado = await updateUsuario(id_usuario, nombre.trim(), apellido.trim());
    if (!usuarioEditado) {
      return res.status(404).json({ error: "No se encontró el usuario para actualizar." });
    }

    return res.status(200).json(usuarioEditado);
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor al actualizar el usuario" });
  }
});
//eliminar la cuenta
endpointsUsuario.delete("/perfil/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const id_usuario = Number(id);

    if (isNaN(id_usuario)) {
      return res.status(400).json({ error: "El ID ingresado no es válido." });
    }

    const usuarioEliminado = await deleteUsuario(id_usuario);
    if (!usuarioEliminado) {
      return res.status(404).json({ error: "No se encontró el usuario a eliminar." });
    }

    return res.status(200).json({ mensaje: "Usuario eliminado correctamente." });
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor al eliminar el usuario" });
  }
});