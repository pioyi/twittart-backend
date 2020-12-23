const userResolvers = require("./userResolvers")
const authResolvers = require("./authResolvers")
const postResolvers = require("./postResolvers")

module.exports = {
    Post: {
        likeCount: parent => parent.likes.length,
        commentCount: parent => parent.comments.length
    },
    Query: {
        ...userResolvers.Query,
        ...postResolvers.Query
    },
    Mutation: {
        ...authResolvers.Mutation,
        ...postResolvers.Mutation
    }
}