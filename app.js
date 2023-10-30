import express from "express";
import "dotenv/config";
import router from "./routes/index.js";
import {
  notFoundHandler,
  prismaErrorHandler,
  serverErrorHandler,
  zodErrorHandler,
} from "./middlewares/error/index.js";

const app = express();
const { PORT } = process.env;
app.use(express.json());

app.use("/api/v1", router);

app.use(zodErrorHandler);
app.use(prismaErrorHandler);
app.use(serverErrorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
