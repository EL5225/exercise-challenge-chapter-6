import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "1.0.0", // by default: '1.0.0'
    title: "API docs Challenge 6", // by default: 'REST API'
    description: "API for challenge 6", // by default: ''
  },
  servers: [
    {
      url: "http://localhost:3000", // by default: 'http://localhost:3000'
      description: "localhost api", // by default: ''
    },
    {
      url: "https://puce-relieved-moth.cyclic.app", // by default: 'http://localhost:3000'
      description: "deployment api", // by default: ''
    },
  ],
  tags: [
    {
      name: "Auth", // Tag name
      description: "auth endpoints", // Tag description
    },
    {
      name: "Profiles", // Tag name
      description: "profiles endpoints", // Tag description
    },
  ],
  components: {
    securitySchemes: {
      token: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
  },
};

const outputFile = "./docs/swagger-output.json";
const routes = ["../routes/index.js"];
/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({ openapi: "3.0.3" })(outputFile, routes, doc);
