import authController from '../controller/auth.controller'
import { Router, Request, Response } from 'express'

const authRouter = Router()
const auth = new authController()

/** This routes have prefix '/auth' */

authRouter.post('/register', (req: Request, res: Response) => {auth.register(req, res)})
authRouter.post('/login', (req: Request, res: Response) => {auth.login(req, res)})
authRouter.post('/logout', (req: Request, res: Response) => {auth.logout(req, res)})

export default authRouter