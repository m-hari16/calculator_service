import { loginDTO, registerDTO, userDTO, userWithAccessTokenDTO } from "../dto/userDTO";
import authService from "../service/auth.service";
import { Request, Response } from 'express';

class authController {
  private authSvc: authService

  constructor() {
    this.authSvc = new authService()
  }

  async register(req: Request, res: Response): Promise<Response<userDTO>> {
    const registerData: registerDTO = req.body
    const dataRegister = await this.authSvc.register(registerData)
    
    return res.status(201).json(dataRegister)
  }

  async login(req: Request, res: Response): Promise<Response<userWithAccessTokenDTO>> {
    const credentialUser: loginDTO = req.body
    const dataLogin = await this.authSvc.login(credentialUser)

    return res.status(200).json(dataLogin)
  }

  async logout(req: Request, res: Response): Promise<Response<{success: boolean}>> {
    const token: string = req.body.token
    const userLogout: boolean = await this.authSvc.logout(token)

    return res.status(200).json({
      success: userLogout
    })
  }
}

export default authController