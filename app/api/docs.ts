import { withSwagger } from "next-swagger-doc";

const swaggerHandler = withSwagger({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "io.vefskoli.is API Swagger Docs",
      version: "0.1.0",
    },
  },
  apiFolder: "pages/api",
});
export default swaggerHandler();
