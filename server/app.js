const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

//Load Schema and resolvers
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");

// Load db methods
const mongoDataMethods = require("./data/db");

//Connect to mongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://huy:iXSQ7U2vkx8J9v9p@cluster0.zfyia.mongodb.net/GraphQL?retryWrites=true&w=majority"
    );

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ mongoDataMethods }),
});

const app = express();

const main = async () => {
  await server.start();
  server.applyMiddleware({ app });
};
main();

app.listen({ port: 4000 }, () => {
  console.log(
    `Server is running at http://localhost:4000${server.graphqlPath}`
  );
});
