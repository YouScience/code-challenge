import express from "express";
import cors from "cors";
import * as listRouter from "./list/listRouter";
import * as itemRouter from "./item/itemRouter";

const app: express.Application = express();

const PORT: number = 8000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use("/list", listRouter.default);
app.use("/item", itemRouter.default);

app.listen(PORT, () => {
  console.log(`Server stated and runnning in port: ${PORT}`);
});
