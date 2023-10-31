import express from "express";
import "dotenv/config.js";
import swaggerUi from "swagger-ui-express";
import docs from "./docs/swagger-output.json" assert { type: "json" };
import router from "./routes/index.js";
import cors from "cors";
import {
  notFoundHandler,
  prismaErrorHandler,
  serverErrorHandler,
  zodErrorHandler,
} from "./middlewares/error/index.js";

const app = express();
const { PORT } = process.env;
const swaggerDocument = docs;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Welcome to API V1, Open /api/v1/docs to see the documentation",
  });
});

app.use("/api/v1", router);

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(zodErrorHandler);
app.use(prismaErrorHandler);
app.use(serverErrorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
