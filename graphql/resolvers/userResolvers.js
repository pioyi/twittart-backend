const UserModel = require("../../models/User")

module.exports = {
    Query: {
        users: async () => {
            const users = await UserModel.find()
            return users
        },
        user: async (_, { id }) => {
            const user = await UserModel.findById(id)
            return user
        },
    }
}