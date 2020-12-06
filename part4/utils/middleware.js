const errorHandler = (error, request, response) => {
  console.error('Goging here')
  console.log('error', error.name)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (
    error.name === 'ValidationError' ||
    error.name === 'BadRequestError'
  ) {
    return response.status(400).send({ error: error.message })
  }
  return response.status(500).send({ error: error.message })
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

module.exports = {
    errorHandler,
    unknownEndpoint,
}