require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const userRouter = require("./routes/userRoute");
const cors = require("cors");

//  middlewares
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Mb Events Server" });
});

app.use("/api/v1", userRouter);

// error routes
app.use((req, res) => {
  res.status(401).json({ success: false, message: "ROUTE NOT FOUND" });
});

// database connection
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: "mbevents" });
    app.listen(PORT, () => {
      console.log(`server running on port : ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
