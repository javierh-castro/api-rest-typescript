import colors from "colors";
import server from "./server";

const port = process.env.PORT || 4000  //Aca indica que si esa variable existe ponla sino 'o' 4000

server.listen(port, () => {//Listen monta la aplicación de express 
    console.log(colors.cyan.bold(`REST API listening on port ${port}`))
})
