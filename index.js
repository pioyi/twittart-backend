const { ApolloServer } = require("apollo-server")
const mongoose = require("mongoose")
require('dotenv').config()

const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")

// Initializing the server, listening on port 4000
const server = new ApolloServer({
    cors: true,
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
})

mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Mongo database was connected successfully")
    server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
        console.log(`Server listening on ${url}`)
    })
})

