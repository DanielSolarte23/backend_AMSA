const express = require("express");
const cookieParser = require("cookie-parser");
const { Sequelize } = require("sequelize");
const db = require("./models");
const autenticacionRoutes = require("./routes/autenticacion.routes");
const apartamentosRoutes = require("./routes/apartamentos.routes");
const visitantesRoutes = require("./routes/visitantes.routes");
const pagoRoutes = require("./routes/pagos.routes");
const informesRoutes = require("./routes/informes.routes");
const usuariosRoutes = require("./routes/usuarios.routes");
const cors = require("cors");

const app = express();
app.use(express.json());


app.use(cors(
  {
    origin: "http://localhost:3001",
    credentials: true
  }
));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", usuariosRoutes);
app.use("/api", autenticacionRoutes);
app.use("/api", apartamentosRoutes);
app.use("/api", visitantesRoutes);
app.use("/api", pagoRoutes);
app.use("/api", informesRoutes);

db.sequelize.sync().then(() => {
  console.log("Conectado a mysql");
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
