const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');
dotenv.config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Acortador de URLs',
      version: '1.0.0',
      description: 'Documentación del backend con autenticación, usuarios y URLs cortas',
    },
    servers: [
      {
        url: process.env.BASE_URL,
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'], // Rutas donde agregaste los comentarios Swagger
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
