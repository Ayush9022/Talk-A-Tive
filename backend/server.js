// import express from "express";
// import dotenv from "dotenv";
// import { chats } from "./data.js";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import userRoutes from "./Routes/userRoutes.js";

const express = require("express");
const dotenv = require("dotenv");
// const { chats } = require("./data.js");
const cors = require("cors");
const connectDB = require("./config/db.js");
const userRoutes = require("./Routes/userRoutes.js");
const chatRoutes = require("./Routes/chatRoutes.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("sab sahi hai");
// });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

// app.get("/api/chat/:id", (req, res) => {
//   const data = chats.find((c) => {
//     return c._id === req.params.id;
//   });
//   res.send(data);
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening at PORT ${PORT}`);
});
