const { Schema, model } = require("mongoose")

const postSchema = new Schema({
    title: String,
    body: String,
    createdAt: { 
        type: Date, 
        default: Date.now
    },
    comments: [
        {
            body: String,
            createdAt: { 
                type: Date, 
                default: Date.now
            },
            profileColor: String,
            username: String
        }
    ],
    likes: [
        {
            username: String
        }
    ],
    username: String,
    profileColor: String,
})

module.exports = model("Post", postSchema)