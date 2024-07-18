const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const connectDB = require("./config/database");

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to Tasks API");
});

const userRouter = require("./routes/user.route");

app.use("/users", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

try {
  connectDB();
} catch (error) {
  console.error("Failed to connect to MongoDB:", error);
  process.exit(1);
}
