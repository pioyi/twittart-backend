const jwt = require("jsonwebtoken")
const { AuthenticationError } = require("apollo-server")

module.exports = context => {
    const authHeader = context.req.headers.twittart
    if (!authHeader) throw new AuthenticationError("Token was not provided")

    try {
        const user = jwt.verify(authHeader, process.env.SECRET_KEY)
        return user
    } catch (error) {
        throw new AuthenticationError("Invalid Token")
    }
}