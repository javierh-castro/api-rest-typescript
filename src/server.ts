import express from "express";
import color from "colors";
import router from "./router";
import db from "./config/db";

// Conectar a base de datos
async function connectDB() {
  try {
    await db.authenticate();
    db.sync()//Este crea la base de datos
    // console.log(color.blue("Conexión exitosa a la BD"));
  } catch (error) {
    console.log(error);
    console.log(color.red.bold("Hubo un error al conectar a la BD"));
  }
}
connectDB();

const server = express();

//Leer datos de formulario
server.use(express.json())

server.use("/api/products", router); //aca podemos modificar el nombre del url todos a la vez

server.get('/api', (req, res) => {
  res.json({msg: 'Desde API'})
})

export default server;
