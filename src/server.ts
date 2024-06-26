import express from "express";
import router from "./router";

const server = express();

server.use('/api/products', router)//aca podemos modificar el nombre del url todos a la vez
 
export default server;
