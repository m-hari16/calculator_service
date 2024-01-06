import authController from '../controller/auth.controller'
import { Router, Request, Response } from 'express'

const authRouter = Router()
const auth = new authController()

/** This routes have prefix '/auth' */

authRouter.post('/register', (req: Request, res: Response) => {auth.register(req, res)})
authRouter.post('/login', (req: Request, res: Response) => {auth.login(req, res)})

export default authRouter