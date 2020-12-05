const app = require('./app')
const { PORT } = require('./utils/config')
const http = require('http')
const server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})