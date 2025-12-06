import {
  type FastifyInstance,
  type FastifyRequest,
  type FastifyReply,
} from "fastify";

export default async function (app: FastifyInstance) {
  app.get("/new", { schema: {} }, async (request:FastifyRequest, reply:FastifyReply) => {
    return "new";
  });

  app.get(
    "/nice",
    { schema: {} },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return "nice";
    }
  );
}
