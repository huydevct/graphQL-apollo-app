const express = require("express");
const { ApolloServer } = require("apollo-server-express");

//Load Schema and resolvers
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
const main = async () => {
    await server.start()
    server.applyMiddleware({ app });
} 
main()

app.listen({port: 4000}, () => {
    console.log(`Server is running at http://localhost:4000${server.graphqlPath}`)
})
