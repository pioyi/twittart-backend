const Post = require("../../models/Post")
const PostModel = require("../../models/Post")
const isAuth = require("../../utils/isAuth") 
const { UserInputError } = require("apollo-server")
const { validatePost } = require("../../utils/validators")

module.exports = {
    Query: {
        posts: () => {
            try {
                return PostModel.find().sort({ createdAt: -1 }).limit(10)
            } catch (err) {
                throw new Error(err)
            }
        },
        post: (parent, { id }) => {
            try {
                return PostModel.findById(id)
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        createPost: async (parent, { title, body }, context) => {
            const user = isAuth(context)
            const ValidationObject = validatePost({ title, body })
            if (!ValidationObject.success) throw new UserInputError("Validation Error", ValidationObject)

            const newPost = new Post({
                title,
                body,
                user: user.id,
                profileColor: user.profileColor,
                username: user.username
            })

            const post = await newPost.save()
            return post
        },
        createComment: async (parent, { postId, body }, context) => {
            const user = isAuth(context)
            if (body.length < 20 || body.length > 200) throw new UserInputError("Invalid Input", {
                exceptionObject: {
                    body: "Body must be between 20 - 200 characters"
                }
            })

            const post = await PostModel.findById(postId)
            if (!post) throw new UserInputError("Post does not exist")

            post.comments.unshift({
                body,
                username: user.username,
                profileColor: user.profileColor
            })

            await post.save()
            return post
        },
        likePost: async (parent, { postId }, context) => {
            const user = isAuth(context)

            const post = await PostModel.findById(postId)
            if (!post) throw new UserInputError("Post does not exist")

            if (post.likes.find(like => like.username === user.username)) {
                post.likes = post.likes.filter(like => like.username !== user.username)
            } else {
                post.likes.push({ username: user.username })
            }

            await post.save()
            return post
        }
    }
}