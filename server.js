require("dotenv").config();
const express = require("express");
const homeRoute = require("./src/routes/homeRoute");
const path = require("path");
const fs = require("fs");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const database = require("./src/database/database");
const adminRoute = require("./src/routes/adminRoute");
const dashboardRoute = require("./src/routes/dashboardRoute");
const loginRoute = require("./src/routes/loginRoute");
const registerRoute = require("./src/routes/registerRoute");
const loginRegisterRoute = require("./src/routes/loginRegisterRoute");
const validaCPFRoute = require("./src/routes/validaCPFRoute");
const checkCEPRoute = require("./src/routes/checkCEPRoute");
const uploadImagesRoute = require("./src/routes/uploadImagesRoute");
const profileRoute = require("./src/routes/profileRoute");
const logoutAdminRoute = require("./src/routes/logoutAdminRoute");
const logoutRoute = require("./src/routes/logoutRoute");
const pagesRoute = require("./src/routes/pagesRoute");
const phoneRoute = require("./src/routes/phoneRoute");
const positionRoute = require("./src/routes/positionRoute");
const editableRoute = require("./src/routes/editableHtmlRoute");
const pagesProfRoute = require("./src/routes/pagesProfRoute");

const app = express();
const port = process.env.PORTSERVER || 3000;

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "./public/uploads")));

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(
  session({
    name: "session",
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;

  next();
});

app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

app.use("/", homeRoute);
app.use("/admin", adminRoute);
app.use("/dashboard", dashboardRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/loginRegister", loginRegisterRoute);
app.use("/validacpf", validaCPFRoute);
app.use("/checkCEP", checkCEPRoute);
app.use("/uploadImages", uploadImagesRoute);
app.use("/logoutAdmin", logoutAdminRoute);
app.use("/profile", profileRoute);
app.use("/logout", logoutRoute);
app.use("/pages", pagesRoute);
app.use("/telefone", phoneRoute);
app.use("/position", positionRoute);
app.use("/aulaGetPaginas", pagesProfRoute);
app.use("/editableHtml", editableRoute);

app.listen(port, async () => {
  const [result] = await database.query("SELECT 1");
  if (result) {
    console.log(`http://localhost:${port}`);
  }
});
