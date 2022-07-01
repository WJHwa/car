const express = require("express");
const app = express();
const index = require("./route/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "ec2-13-124-196-249.ap-northeast-2.compute.amazonaws.com",
      "http://13.124.196.249:3000",
    ],
  })
);
app.use(cookieParser());

require("dotenv").config();

//라우팅
app.use(index);

app.listen(process.env.POST, () => {
  console.log("server Port 8080");
});
