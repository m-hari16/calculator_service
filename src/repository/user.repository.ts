import { registerDTO, userDTO, userWithEncryptedPasswordDTO } from '../dto/userDTO'
import { PrismaClient } from '@prisma/client';

class userRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async saveUser(userData: registerDTO): Promise<userDTO> {
    const save = await this.prisma.user.create({
      data: userData,
      select: {
        id: true,
        email: true,
        name: true
      }
    })

    return save
  }

  async getUserByEmail(email: string): Promise<userWithEncryptedPasswordDTO> {
    const get = await this.prisma.user.findFirstOrThrow({
      where: {
        email: email
      }
    })

    return get
  }

  async getUserById(id: string): Promise<userDTO> {
    const get = await this.prisma.user.findFirstOrThrow({
      where: {
        id: id
      },
      select: {
        id: true,
        email: true,
        name: true        
      }
    })

    return get
  }
  
}

export default userRepository