import { Router } from "express";
import { getOneUsuario, createUsuario,} from "../db/usuario.js";
export const endpointsUsuario = Router();

endpointsUsuario.post("/acceder",async(req,res)=>{
    try {
        const { correo } = req.body || {};

        if (!correo || correo.trim() === "") {
            return res.status(400).json({ error: "El correo es obligatorio." });
        }

        const correoLimpio = correo.trim().toLowerCase();
        // 1. Buscamos si ya existe con tu función getOneUsuario
        let usuario = await getOneUsuario(correoLimpio);
        let creado = false;
        // 2. Si no existe, lo creamos con tu función createUsuario
        if (!usuario) {
            usuario = await createUsuario(correoLimpio);
            creado = true;
        }

        // Devolvemos el id_usuario y el correo
        return res.status(creado ? 201 : 200).json({
            mensaje: creado ? "Usuario registrado con éxito" : "Sesión iniciada",
            usuario
        });

    } catch (error) {
        console.error("Error en /acceder:", error);
        return res.status(500).json({ error: "Error interno del servidor al procesar el usuario." });
    }
})