import express from 'express'
import  {serve as serveSwagger, setup as setupSwagger} from 'swagger-ui-express'
import swaggerSchema from '../swagger.json'
import { userRouter } from './user/user.controller'
import { errorHandler } from './utils/errorHandler'

const PORT = process.env.PORT || 3000

const app = express()


app.use(express.json())
// const swaggerSchema = require('../swagger.json')
app.use('/api-docs', serveSwagger, setupSwagger(swaggerSchema))

app.use('/users', userRouter)

app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})

process.on('uncaughtException', error => {
  console.error('Something bad happened here....', error)
  process.exit(1)
})

process.on('SIGNIT', error => {
  console.error('Something bad happened here....', error)
  process.exit(1)
})