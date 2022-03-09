import app from "./app";
import { Database } from "./bootstrap/database.bootstrap";

const port = process.env.PORT || 3000;
const database = new Database();

database.bootstrap();

//  Starting the server
app.listen(port);

export default app;
