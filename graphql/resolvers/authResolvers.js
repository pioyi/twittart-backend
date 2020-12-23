const UserModel = require("../../models/User")
const { UserInputError } = require("apollo-server")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { validateRegister, validateLogin } = require("../../utils/validators")
const { generateProfileColor } = require("../../utils/helpers")

function signToken({ username, profileColor, id }) {
    return jwt.sign({
        username,
        profileColor,
        id
    }, process.env.SECRET_KEY, { expiresIn: "12h" })
}

module.exports = {
    Mutation: {
        async addUser(parent, args) {
            const ValidationObject = validateRegister(args)
            if (!ValidationObject.success) throw new UserInputError("Validation Error", ValidationObject)
            const { username, password } = args

            // Check if user exists
            doesExist = await UserModel.findOne({ username })
            if (doesExist) throw new UserInputError("Username already exists!", {
                exceptionObject: {
                    username: "Username already exists!"
                }
            })

            // Hashing password
            hashedPassword = await bcrypt.hash(password, 12)

            const newUser = new UserModel({
                username, 
                password: hashedPassword,
                profileColor: generateProfileColor(username)
            })

            const user = await newUser.save()
            token = signToken(newUser)

            return {
                username,
                profileColor: user.profileColor,
                id: user._id,
                token
            }
        },
        async loginUser(parent, { username, password }) {
            const ValidationObject = validateLogin({ username, password })
            if (!ValidationObject.success) throw new UserInputError("Validation Error", ValidationObject)
            
            const targetUser = await UserModel.findOne({ username })
            if (!targetUser) throw new UserInputError("Username doesn't exists!", {
                exceptionObject: {
                    username: "Username doesn't exists!"
                }
            })

            // Hashing password
            const isMatch = await bcrypt.compare(password, targetUser.password)
            if (!isMatch) throw new UserInputError("Wrong Credentials!", {
                exceptionObject: {
                    password: "Wrong Credentials!"
                }
            })

            // Signing json web token
            token = signToken(targetUser)

            return {
                username,
                profileColor: targetUser.profileColor,
                id: targetUser._id,
                token
            }
        }
    }
}