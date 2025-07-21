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

// 🌐 CORS configurado para frontend en Vercel
app.use(cors({
  origin: [process.env.FRONTEND_URL], // debe ser array
  credentials: true,
}));

// 🧠 Middleware de sesión (si estás usando express-session)
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // ✅ true si está en producción (Render)
    sameSite: 'none', // ✅ permite envío de cookies entre dominios distintos (CROSS)
  },
}));

// 📚 Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 🧱 Middlewares base
app.use(express.json());
app.use(cookieParser());

// 🔌 Conectar a MongoDB
db();

// 📦 Rutas
app.use('/users', require('./routes/UserRoutes'));
app.use('/', require('./routes/UrlRoutes'));

// 🚀 Levantar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
