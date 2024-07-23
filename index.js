const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/database");
const app = express();

//========= Import routes =========//
const userRouter = require("./routes/user.route");
const taskRouter = require('./routes/task.route');

//========= Middleware =========//
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

//========= Define routes =========//
app.get("/", (req, res) => {
  res.send("Welcome to Tasks API");
});
const apiRouter = express.Router();
apiRouter.use('/user', userRouter);
apiRouter.use('/tasks', taskRouter);
app.use('/api', apiRouter);

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
