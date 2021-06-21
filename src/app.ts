import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const search = require("./schema/search");
const app = express();
const database: string = process.env.DATABASE as string;

mongoose.connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const typeDefs = gql`
  type Search {
    title: String!
    description: String!
    url: String!
  }
  type Query {
    search(name: String!): [Search]
  }
`;

const resolvers = {
  Query: {
    search: async (root: {}, args: { name: string }, context: {}) => {
      const find = args.name;
      console.log(find);
      return await search.find({ title: { $regex: `${find}`, $options: "i" } });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, path: "/graphql-playground" });

const port = process.env.PORT || 2000;

app.listen(port, () => {
  console.log("server running on port 2000");
});
