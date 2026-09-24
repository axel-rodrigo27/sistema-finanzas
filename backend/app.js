import express from "express";
import cors from "cors";
import { endpointsUsuario} from "./app/api/usuario.js"; // Ajustá la ruta relativa si cambia tu carpeta
import { endpointsmovimientos } from "./app/api/movimientos.js";
const app = express();

const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions)); 

const PORT = 8000;

app.use(express.json());

// Tus endpoints de usuarios
app.use("/api/v1/usuarios", endpointsUsuario);
app.use("/api/v1/movimientos",endpointsmovimientos)

// Verificación de estado del servidor
app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(PORT, () => {
    console.log(`Servidor prendido y escuchando en el puerto ${PORT}`);
});