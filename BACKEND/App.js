const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
require("./models/DB_Config");
const cors = require("cors");
//importer les routes
const userRouter = require("./routes/UserRoute");
const ProductRouter = require("./routes/ArticleRoute");
const MessageRoute = require("./routes/MessageRoute");
const ChatRoute = require("./routes/ChatRoute");
const DemandeRoute = require("./routes/DemandeRoute");
const OrganisationsRoute = require("./routes/OrganisationsRoute");
const CatRoute = require("./routes/CatRoute");
const CagnotteRoute = require("./routes/CagnotteRoute");
const EventRoute =require("./routes/EventRoute");
const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000/",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");

  next();
});
app.use(
  userRouter,
  ProductRouter,
  MessageRoute,
  ChatRoute,
  DemandeRoute,
  OrganisationsRoute,
  CatRoute,
  CagnotteRoute
  ,EventRoute
);

app.use(cors(corsOptions));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Serveur  ${PORT}`);
});
