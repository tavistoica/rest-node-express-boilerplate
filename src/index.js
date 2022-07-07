import { Database } from "./bootstrap/database.bootstrap.js";
import { Server } from "./bootstrap/server.bootstrap.js";

const port = process.env.PORT || 3001;
const database = new Database();
const server = new Server();

database.bootstrap();
server.bootstrap();

//  Starting the server
server.listen(port);
