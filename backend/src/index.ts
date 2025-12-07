import dotenv from "dotenv";
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import path from "path";
import { fileURLToPath } from "url";
import autoload from "@fastify/autoload";
import cors from '@fastify/cors'

const version = "0.0.3";

process.on("uncaughtException", (err: Error) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

dotenv.config();


// const envToLogger:any = {
//   development: {
//     transport: {
//       target: 'pino-pretty',
//       options: {
//         translateTime: 'HH:MM:ss Z',
//         ignore: 'pid,hostname',
//       },
//     },
//   },
//   production: true,
//   test: false,
// }

// const app = fastify.fastify({ logger: envToLogger["development"] ?? true  });
const app = fastify.fastify({ logger: true  });

await app.register(cors, {
   origin: true
})


// Global error handler
app.setErrorHandler((error, request, reply) => {
  // Log the error
  console.error("Global error handler:", error);

  // Send a generic response to the client
  reply.status(500).send({ error: "Internal Server Error" });
});

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
  // return { message: ` hello world :)  version: ${version} ` };
  return ` hello world :)  version: ${version} `;
});
app.get("/favicon.ico", async () => {
  return ``;
});
app
  .listen({ port: 3000, host: "127.0.0.1" })
  .then(() => 1)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
