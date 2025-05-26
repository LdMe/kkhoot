// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

dotenv.config();
const APP_PORT = process.env.APP_PORT;
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de ejemplo',
    version: '1.0.0',
    description: 'Documentación generada con Swagger',
  },
  servers: [
    {
      url: `http://localhost:${APP_PORT}/`,
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
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
