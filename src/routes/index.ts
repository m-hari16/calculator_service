import { Router } from 'express'
import authRouter from './auth.routes'

const baseRoutes = Router()

baseRoutes.use('/auth', authRouter)

export default baseRoutes