import { loginDTO, registerDTO, userDTO, userWithAccessTokenDTO, userWithEncryptedPasswordDTO } from "../dto/userDTO";
import userRepository from "../repository/user.repository";
import userPasswordEncrypt from "../utils/bcrypt";

class authService {
  private userRepo: userRepository

  constructor() { 
    this.userRepo = new userRepository()
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

    return userPasswordEncrypt.generateToken(user)   
  }
  
}

export default authService