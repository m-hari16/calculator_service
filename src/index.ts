import express from 'express'
import * as dotenv from "dotenv"
import cors from 'cors'
import { Request, Response } from 'express'
import baseRoutes from './routes'


dotenv.config()

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (res: Response) => {
  console.log('accessing root path')
  res.send('No service here!')
})

/** Register app routes here */


/** Not found routes handler */
app.use((req: Request, res: Response) => {
  console.log(`accessing path: ${req.url} was not found`)
  res.status(404).json({
    success: false,
    message: 'Not found'
  })
})

app.listen(port, () => {
  console.log(`Application on port ${port}`)
})