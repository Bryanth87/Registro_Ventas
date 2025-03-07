import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Registro de Ventas API",
      version: "1.0.0",
      description: "Documentación de la API para el sistema de registro de ventas",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Servidor de desarrollo",
      },
    ],
  },
  apis: [
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js",
        "./src/category/category.routes.js", 
        "./src/product/product.routes.js",
    ], 
};

const swaggerDocs = swaggerJSDoc(options);

export { swaggerDocs, swaggerUi };