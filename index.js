const db = require('./config/db');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { swaggerUi, swaggerSpec } = require('./config/swagger');

dotenv.config();

const app = express();

// Middleware CORS
app.use(cors({
  origin: process.env.FRONTEND_URL ,
  credentials: true,
}));

// Middleware de sesión
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // Usá true si estás en producción con HTTPS
    sameSite: 'lax',
  },
}));

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Otros middlewares
app.use(express.json());
app.use(cookieParser());

// Conectar a MongoDB
db();

// Rutas
app.use('/users', require('./routes/UserRoutes'));
app.use('/', require('./routes/UrlRoutes'));

// Levantar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
