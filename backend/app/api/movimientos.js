import { Router } from "express";
import { getTreemovimientos,getTotalingresos,getTotalGastos,getTotalCapital } from "../db/movimientos.js";

export const endpointsmovimientos = Router();

// ESTE ES EL ENDPOINT: GET /api/v1/movimientos/ultimos
endpointsmovimientos.get("/ultimos", async (req, res) => {
  try {
    const { usuario_id } = req.query; // Recibe el ID enviado en la URL

    if (!usuario_id) {
      return res.status(400).json({ mensaje: "El id_usuario es obligatorio" });
    }

    // Ejecutamos la función de la base de datos
    const Movimientos = await getTreemovimientos(usuario_id);

    // Respondemos al frontend con los 3 registros devueltos
    res.json(Movimientos);
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});
// 1. GET /api/v1/movimientos/ingresos/total?usuario_id=1
endpointsmovimientos.get("/ingresos/total", async (req, res) => {
    try {
        const { usuario_id } = req.query;
        if (!usuario_id) return res.status(400).json({ mensaje: "usuario_id es requerido" });

        const resultado = await getTotalingresos(usuario_id);
        res.json(resultado); // Devuelve { suma_total: "150000.00" }
    } catch (error) {
        console.error("Error al obtener total de ingresos:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});

// 2. GET /api/v1/movimientos/gastos/total?usuario_id=1
endpointsmovimientos.get("/gastos/total", async (req, res) => {
    try {
        const { usuario_id } = req.query;
        if (!usuario_id) return res.status(400).json({ mensaje: "usuario_id es requerido" });

        const resultado = await getTotalGastos(usuario_id);
        res.json(resultado); // Devuelve { suma_total: "45000.00" }
    } catch (error) {
        console.error("Error al obtener total de gastos:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});

// 3. GET /api/v1/movimientos/capital/total?usuario_id=1
endpointsmovimientos.get("/capital/total", async (req, res) => {
    try {
        const { usuario_id } = req.query;
        if (!usuario_id) return res.status(400).json({ mensaje: "usuario_id es requerido" });

        const resultado = await getTotalCapital(usuario_id);
        res.json(resultado); // Devuelve { suma_total: "105000.00" }
    } catch (error) {
        console.error("Error al obtener capital total:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});
