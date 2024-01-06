import * as dotenv from "dotenv"
import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken"

dotenv.config();

const jwtSecret: string | any = process.env.JWT_SECRET
const unAuthenticated = {
  success: false,
  message: 'Unauthenticated'
}

export default class Authenticate {
  authentication = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const header: string | any = req.headers.authorization
    
    if (!header) {
      return res.status(401).json(unAuthenticated)
    }
    
    const token = header.split(" ")[1]
    if (!token) {
      return res.status(401).json(unAuthenticated)
    }
    
    try {
      const decode = jwt.verify(token, jwtSecret) as {id: number, name: string, exp: number} | null

      if (!decode) {
        return res.status(401).json(unAuthenticated)
      }

      req.headers['x-user-id'] = decode.id.toString()
      req.headers['x-user-name'] = decode.name

      next()

    } catch (error) {
      console.log("invalid token")

      return res.status(401).json(unAuthenticated)
    }
  }
}