// @ts-nocheck
import {
  type FastifyInstance,
  type FastifyRequest,
  type FastifyReply,
  type FastifySchema,
} from "fastify";

import { get_texts, insert_into_texts } from "../services/database.js";

export default async function (app: FastifyInstance) {

const schema: FastifySchema = {
  querystring: {
    type: "object",
    properties: {
      per_page: { type: "integer" },
      page: { type: "integer" }
    },
    required: [],
    additionalProperties: false
  }
};
  app.get(
  "/texts",
  { schema },
  async (request: FastifyRequest, reply: FastifyReply) => {
    const { per_page, page } = request.query as { per_page?: number; page?: number };
    const results = await get_texts(true, per_page,page);
    return results; // No need for JSON.stringify; Fastify handles it
  }
);

  interface TextBody {
    text: string;
  }

  const bodyJsonSchemaForText = {
    type: "object",
    required: ["text"],
    properties: {
      text: { type: "string" },
    },
  };

  const postSchema: FastifySchema = {
    body: bodyJsonSchemaForText,
  };

  app.post<{ Body: TextBody }>(
    "/texts",
    { schema: postSchema },
    async (request, reply) => {
      const { text } = request.body;
      const results = await insert_into_texts(text);
      return results; // Fastify automatically serializes to JSON
    }
  );
}
