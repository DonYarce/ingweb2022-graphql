import { NextApiRequest, NextApiResponse } from "next/types";
import { ApolloServer } from "apollo-server-micro";
import { GlobalTypes } from "@graphql/server/types";
import { GlobalResolvers } from "@graphql/server/resolvers";
import { verifyToken} from "@utils/jwt.utils";
import NextCors from "nextjs-cors";

const handleServer = async (req: NextApiRequest, res: NextApiResponse) => {
  const server = new ApolloServer({
    typeDefs: [...GlobalTypes],
    resolvers: [...GlobalResolvers],
    introspection: true,
    context: ({ req }) => ({
      auth: getAuth(req.headers.authorization)
    }),
  });

  await server.start();

  return server.createHandler({
    path: "/api/graphql",
  })(req, res);
};

const getAuth = (authorization: string) => {
  if (!authorization) {
    return null;
  }

  const token = authorization.replace("Bearer", "").trim();
  const { userId, roleId } = verifyToken(token);

  return {
    userId,
    roleId,
  };
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ["POST", "OPTIONS", "GET", "HEAD"],
    origin: "*",
    optionsSuccessStatus: 204,
  });

  await handleServer(req, res);
}
