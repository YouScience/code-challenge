import express from "express";
import bodyParser from "body-parser";
import itemRoutes from "./routes/itemRoutes";
const cors = require("cors");
const app = express();

app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

app.use("/api", itemRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
