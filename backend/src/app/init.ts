import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors"; // Added CORS
import { User } from "./user";
import { GraphqlContext } from "../types/interfaces";
import { decodeToken } from "../services/jwt";
import { Tweets } from "./tweet/index";

const app = express();


export const initserver = async () => {
  const typeDefs = `
    ${User.types}
    ${Tweets.types}
        type Query {
           ${User.queries}
           ${Tweets.queries}
        }
        type Mutation{
        ${
        Tweets.mutations
        }
        ${User.mutations}
        }
    `;

  const resolvers = {
    Query: {
      ...User.resolvers.queries,
      ...Tweets.resolvers.queries,
    },
    Mutation :{
      ...Tweets.resolvers.mutations,
      ...User.resolvers.mutations,
    },
    ...Tweets.resolvers.extraResolvers,
    ...User.resolvers.extraResolvers,
  };

  const server = new ApolloServer<GraphqlContext>({ typeDefs, resolvers });
  await server.start();
app.use(cors());
app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith("Bearer ")
          ? authHeader.split("Bearer ")[1]
          : null;
        let user = null;
        if (token) {
            user = decodeToken(token);
        }
        return { user };
      },
    })
  );
  return app;
};

initserver();
