import accessLogController from '../controller/accessLog.controller'
import { Router, Request, Response } from 'express'

const logRouter = Router()
const log = new accessLogController()

/** This routes have prefix '/report' */

logRouter.get('/raccess-log-user', (req: Request, res: Response) => {log.getReport(res)})


export default logRouter