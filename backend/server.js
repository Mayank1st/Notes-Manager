import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/connectDB.js";
import router from "./routes/TaskRoutes.js";
import cors from "cors";

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

const corsOptions = {
    origin: 'https://spiffy-cupcake-d5f6e1.netlify.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
};

const app = express();
app.use(express.json());

// Cors
app.use(cors(corsOptions));

// DB Connection
connectDB(DB_URL);

app.use("/api/user", router);

// listening to server
app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});
