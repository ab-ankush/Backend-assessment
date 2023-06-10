import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import userRoutes from "./routers/usersRoutes.js";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// routes
app.use("/users", userRoutes);

// mongoose setup
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.DBURL, {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on port:${PORT}`);
    });
  })
  .catch((err) => console.log(`${err}`));
