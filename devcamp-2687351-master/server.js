//Dependencia commonjs
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
//dependencia de rutas
const UsuariosRoutes = require("./routes/UsuariosRoutes");
const AutorizacionesRoutes = require("./routes/AutorizacionesRoutes");
const citasRoutes = require("./routes/CitasRoutes");


const session = require('express-session');


//DEPENDENcIA PARA CONEXION
const connectDB = require("./config/db");

///establecer archivob .env del proyecto
dotenv.config({
  path: "./config/.env",
});

connectDB();

//crear el objeto app
const app = express();


//express para recibir datos json
app.use(express.json());

app.use(session({
  secret: 'noritat',
  resave: false,
  saveUninitialized: true
}));

//vincular las rutas de bootcamps
app.use("/api/v1/devcamp/usuarios",UsuariosRoutes);
app.use("/api/v1/devcamp/autoriciones", AutorizacionesRoutes);
app.use("/api/v1/devcamp/citas", citasRoutes);

//primera prueba de url del servidor
app.get("/prueba", function (request, response) {
  response.send("Holaaaaaaa");
});

//establecer servidor
const PUERTO = process.env.EXPRESS_PORT;
app.listen(
  PUERTO,
  console.log('Servidor escuchando en el puerto: '+PUERTO.bgRed.green)
);
