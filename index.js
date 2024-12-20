require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const userRouter = require("./routes/userRoute");
const cors = require("cors");
const fileupload = require("express-fileupload");
const cloudinary = require('cloudinary').v2

const eventRouter = require("./routes/eventRouter");

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
});

//  middlewares
app.use(fileupload({ useTempFiles: true })); // allows use to have acess to files
app.use(express.json()); // allows use to have acess to body
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Mb Events Server" });
});

app.use("/api/v1", userRouter);
app.use("/api/v1/events", eventRouter);


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
