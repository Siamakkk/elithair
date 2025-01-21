import {ErrorRequestHandler} from 'express'

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  const url = req.protocol + '://' + req.get('Host') + req.originalUrl
  console.log(`errorHnadler ${req.method}  ${url}`, error)
  const httpStatus = error.httpStatus || 500
  const message = error.message || 'Internal server error'
  res.statusCode = httpStatus
  res.send({
    message
  })
}
