var express = require("express");
require("dotenv").config();
// const expressRecaptcha = require("express-recaptcha"); // Ajout de l'import pour express-recaptcha

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var formRouter = require("./routes/form");
var app = express();

const cors = require("cors"); // Installation de Cors

const corsOptions = {
  origin: function (origin, callback) {
    // Remplacee 'allowedOrigins' avec vos différents URLs front pouvant accéder au Backend
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://sya-frontend.vercel.app",
      "https://sya-backend.vercel.app",
    ];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions)); // Installation de Cors

// const cors = require("cors");
// app.use(
//   cors({
//     origin: "https://sya-frontend.vercel.app", // Replace with your frontend origin
//     credentials: true, // Allow cookies for authorized requests
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
//   })
// );

//const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY; // Récupération de la clé secrète reCAPTCHA

// Configuration de express-recaptcha
//app.use(expressRecaptcha.middleware.recaptcha({
//  secretKey: recaptchaSecretKey,
//}));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/form", formRouter);

module.exports = app;
