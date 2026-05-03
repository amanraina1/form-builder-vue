import "dotenv/config";
import express from "express";
import cors from "cors";
import formRouter from "./routes/forms.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5174" }));
app.use(express.json());

app.use("/api/forms", formRouter);

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening at port: ${PORT}`);
});
