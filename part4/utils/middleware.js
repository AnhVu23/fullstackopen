const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (
    error.name === 'ValidationError' ||
    error.name === 'BadRequestError'
  ) {
    return response.status(400).json({ error: error.message })
  }
  return response.status(500).json({ error: error.message })
}

const unknownEndpoint = (request, response) => {
  return response.status(404).json({ error: 'unknown endpoint' })
}

module.exports = {
  errorHandler,
  unknownEndpoint,
}
