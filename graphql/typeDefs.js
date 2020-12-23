const { gql } = require("apollo-server")

module.exports = gql`
    type User {
        id: ID!
        username: String!
        profileColor: String!
        token: String!
        createdAt: String!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        username: String!
        profileColor: String!
        createdAt: String!
        comments: [Comment!]
        likes: [Like!]
        likeCount: Int!
        commentCount: Int!
    }

    type Comment {
        id: ID!
        body: String!
        username: String!
        profileColor: String!
        createdAt: String!
    }

    type Like {
        id: ID!
        username: String!
    }

    type Query {
        users: [User!]
        user(id: ID!): User

        posts: [Post!]
        post(id: ID!): Post
        getPopularPosts: [Post!]!
    }

    type Mutation {
        addUser(username: String!, password: String!, password2: String!): User!
        loginUser(username: String!, password: String!): User!

        createPost(title: String!, body: String!): Post!
        createComment(postId: ID!, body: String!): Post!
        likePost(postId: ID!): Post!
    }
`