import server from "./server";

server.listen(4000, () => {//Listen monta la aplicación de express 
    console.log('REST API listening on port 4000')
})
