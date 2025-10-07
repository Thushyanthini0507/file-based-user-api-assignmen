import express from "express";
import userRoutes from "./Routes/userRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
