import {
  type FastifyInstance,
  type FastifyRequest,
  type FastifyReply,
} from "fastify";

export default async function (app: FastifyInstance) {
  interface MyParams {
    inputText: string;
  }

  const schema = {
    summary: "Echo input",
    description:
      "Takes a path parameter and returns it inside a greeting message.",
    params: {
      type: "object",
      properties: {
        inputText: {
          type: "string",
          description: "Text that will be echoed back.",
        },
      },
      required: ["inputText"],
    },
    response: {
      200: {
        type: "string",
        example: "hello: world",
      },
    },
  };

  app.get<{
    Params: MyParams;
  }>("/input/:inputText", { schema: schema }, async (request:FastifyRequest<{Params:MyParams}>, reply:FastifyReply) => {
    const { inputText } = request.params;
    return `hello: ${inputText}`;
  });
}
