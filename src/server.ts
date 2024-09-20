import express from "express";
import color from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan"
import swaggerUi from "swagger-ui-express";
import router from "./router";
import db from "./config/db";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";

// Conectar a base de datos
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync(); //Este crea la base de datos
    // console.log(color.blue("Conexión exitosa a la BD"));
  } catch (error) {
    console.log(error);
    console.log(color.red.bold("Hubo un error al conectar a la BD"));
  }
}
connectDB();

const server = express();
//Permitir conexiones
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error('Error de CORS'));
    }
  },
};
server.use(cors(corsOptions));

//Leer datos de formulario
server.use(express.json());

server.use(morgan('dev'))
server.use("/api/products", router); //aca podemos modificar el nombre del url todos a la vez

//Docs
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
