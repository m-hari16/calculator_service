import accessLogRepository from "../repository/accessLog.repository";
import { 
  logAccessWithUserData, 
  loginDTO, 
  payloadAccessTokenRequest, 
  registerDTO, 
  userDTO, 
  userWithAccessTokenDTO, 
  userWithEncryptedPasswordDTO 
} from "../dto/userDTO";
import userRepository from "../repository/user.repository";
import userPasswordEncrypt from "../utils/bcrypt";
import * as jwt from "jsonwebtoken"

class authService {
  private userRepo: userRepository
  private accessLogRepo: accessLogRepository

  constructor() { 
    this.userRepo = new userRepository()
    this.accessLogRepo = new accessLogRepository()
  }

  async register(userData: registerDTO): Promise<userDTO> {
    const encryptedPass: string = await userPasswordEncrypt.encryptPassword(userData.password)

    const payload: registerDTO = {
      email: userData.email.toLowerCase(),
      password: encryptedPass,
      name: userData.name
    }

    const created = await this.userRepo.saveUser(payload)

    return created
  }

  async login(credential: loginDTO): Promise<userWithAccessTokenDTO> {
    const user: userWithEncryptedPasswordDTO = await this.userRepo.getUserByEmail(credential.email.toLowerCase())

    const isMatch: boolean = userPasswordEncrypt.comparePassword(user.password, credential.password)

    if(!isMatch) {
      throw new Error("Unauthenticated")
    }

    const logUserLogin: logAccessWithUserData = await this.accessLogRepo.saveTimestampLogin(user.id)

    const payloadToken: payloadAccessTokenRequest = {
      userId: user.id,
      name: user.name,
      accessLogId: logUserLogin.id
    }

    return userPasswordEncrypt.generateToken(payloadToken)   
  }

  async logout(token: string): Promise<boolean> {
    const jwtSecret: string | any = process.env.JWT_SECRET

    const decode: payloadAccessTokenRequest | null = jwt.verify(token, jwtSecret) as {userId: string, name: string, accessLogId: string} | null

    if (!decode) {
      throw new Error("Unauthenticated")
    }

    await this.accessLogRepo.saveTimestampLogout(decode.accessLogId)

    return true
  }
  
}

export default authService