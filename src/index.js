import express from "express";
import mongoose from "mongoose";
import { serve, setup } from "swagger-ui-express";
import * as OpenApiValidator from "express-openapi-validator";
import swaggerDocument from "../swagger/spec.yaml";
import errorMiddleware from "./middleware/errorMiddleware";
import { dbURL } from "./util/database";
import healthRouter from "./routes/health";
import todoRouter from "./routes/todo";

const app = express();
const port = process.env.PORT || 3000;

//  Connect to the MongoDB
mongoose.connect(dbURL, { useNewUrlParser: true });

app.use(express.json());

const IS_NOT_PRODUCTION = process.env.NODE_ENV !== "production";
if (IS_NOT_PRODUCTION) {
  app.use("/api-docs", serve, setup(swaggerDocument));
}

//  Swagger error validator
app.use(
  OpenApiValidator.middleware({
    apiSpec: swaggerDocument,
    validateRequests: true,
    validateResponses: true
  })
);

//  Declaring API routes
app.use("/health", healthRouter);
app.use("/todo", todoRouter);

//  Starting the server
app.listen(port, () => {
  console.log(`started listening on port ${port}`);
});

//  Error handling
app.use(errorMiddleware);

export default app;
