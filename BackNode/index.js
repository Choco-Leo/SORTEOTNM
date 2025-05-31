import express from 'express';
import cors from 'cors';
import { config } from './src/config/env.js';
import { dbConnect } from './src/config/db.js';
import routes from './src/routes/routesBK.js'
import { authSesion } from './src/middleware/cookies.js';
import cookieParser from 'cookie-parser';

const app = express();

// Solo CORS en desarrollo

  app.use(cors({
    origin: [
      'http://localhost:4200',
      'http://localhost:4000',
      'https://prenacional.cdvictoria.tecnm.mx:3000'
    ],
    credentials: true
  }));


//Configuración de CORS y Authenticación
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dbConnect();
app.use(authSesion);

// Rutas
app.use(routes)

// Inicio del servidor
app.listen(config.PORT, () => {
  console.log(`Servidor escuchando en Puerto${config.PORT}`);
});