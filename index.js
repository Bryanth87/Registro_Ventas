import { config } from "dotenv";
import { initServer } from "./configs/server.js";
import createDefaultAdmin from "./src/user/createAdmin.js"; 

config();

createDefaultAdmin()
    .then(() => {
        console.log("Verificación de administrador completada");
    })
    .catch((err) => {
        console.error("Error durante la verificación del administrador:", err);
    });

initServer();