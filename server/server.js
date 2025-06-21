const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");
//config dot env
dotenv.config();

//database connect
connectDb();

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes
//user route
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/users", require("./routes/userRoute"));

//task route
app.use("/tasks", require("./routes/taskRoute"));

//port
const PORT = process.env.PORT || 8080;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
