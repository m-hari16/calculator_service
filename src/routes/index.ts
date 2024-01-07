import { Router } from 'express'
import authRouter from './auth.routes'
import logRouter from './accessLog.routes'

const baseRoutes = Router()

baseRoutes.use('/auth', authRouter)
baseRoutes.use('/report', logRouter)

export default baseRoutes