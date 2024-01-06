import * as dotenv from 'dotenv'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userWithAccessTokenDTO, userWithEncryptedPasswordDTO } from '../dto/userDTO'

dotenv.config()

const jwtSecret: string | any = process.env.JWT_SECRET

export default class userPasswordEncrypt {
  static async encryptPassword(password: string): Promise<string> {
    return bcrypt.hashSync(password, 12)
  }

  static comparePassword(hashedPassword: string, passwordInput: string): boolean {
    return bcrypt.compareSync(passwordInput, hashedPassword)
  }

  static generateToken(userData: userWithEncryptedPasswordDTO): userWithAccessTokenDTO {
    const accessToken = jwt.sign(
      {
        id: userData.id,
        name: userData.name,
      },
      jwtSecret,
      {
        expiresIn: '24h'
      }
    )

    const now = new Date()

    return {
      name: userData.name,
      accessToken: accessToken,
      expiredAt: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
      refreshToken: ""
    }
  }
  
}