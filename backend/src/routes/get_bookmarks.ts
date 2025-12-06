import {
  type FastifyInstance,
  type FastifyRequest,
  type FastifyReply,
  type FastifySchema,
} from "fastify";
import get_bookmarks from "../services/database.ts";

export default async function (app: FastifyInstance) {
interface MyParams {
    limit: number; 
  }

  const schema: FastifySchema = {};
    // Params: MyParams;
    // <{ Params: MyParams }>
    // :limit
  app.get(
    "/getBookmarks/",
    { schema: schema },
    async (
      request: FastifyRequest,
      reply: FastifyReply
    ) => {
      // const { limit } = request.params;
      const bookmarks = await get_bookmarks();
      return JSON.stringify(bookmarks);
    }
  );
}
