import dotenv from "dotenv";
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import path from "path";
import { fileURLToPath } from "url";
import autoload from "@fastify/autoload";

const version = "0.0.2"

dotenv.config();
const app = fastify.fastify({ logger: true });

const swaggerOptions = {
  swagger: {
    info: {
      title: "Tracker",
      description:
        "This app lets you track personal data like notes, time tracking, nutrient and medication intake, etc.",
      version: version,
    },
  },
};

const swaggerUiOptions = {
  routePrefix: "/docs",
  exposeRoute: true,
};

app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUiOptions);

const __dirname = path.dirname(fileURLToPath(import.meta.url)); //const __filename = fileURLToPath(import.meta.url);

app.register(autoload, {
  dir: path.join(__dirname, "routes"),
  forceESM: true,
});

app.get("/", async () => {
  return { message: "version: " };
});
app
  .listen({ port: 3000, host: "127.0.0.1" })
  .then(() => console.log("Server running on :3000"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
