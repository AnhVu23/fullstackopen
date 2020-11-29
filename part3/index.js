const app = require('./app')

const server = app.listen(3001, () => {
	console.log(`App is running on port 3001`)
})