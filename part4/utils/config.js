const PORT = process.env.PORT || 3003
let MONGODB_URI = process.env.MONGODB_URI
if (process.env.NODE_ENV === 'test') {
    MONGODB_URI = process.env.TEST_MONGODB_URI
}
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10)
const jwtSecret = process.env.JWT_SECRET
module.exports = {
    PORT,
    MONGODB_URI,
    SALT_ROUNDS,
    jwtSecret
}