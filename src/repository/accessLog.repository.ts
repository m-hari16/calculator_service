import { logAccessWithUserData } from "@/dto/userDTO";
import { PrismaClient } from "@prisma/client";

class accessLogRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async saveTimestampLogin(userId: string): Promise<logAccessWithUserData> {
    const log = await this.prisma.accessLog.create({
      data: {
        userId: userId,
        loginAt: new Date()
      },
      include: {
        user: true
      }
    })

    const result: logAccessWithUserData = {
      id: log.id,
      userId: log.userId,
      name: log.user.name,
      loginAt: log.loginAt,
      logoutAt: log.logoutAt || undefined
    }

    return result
  }

  async saveTimestampLogout(accessLogId: string): Promise<logAccessWithUserData> {
    const log = await this.prisma.accessLog.update({
      where: {
        id: accessLogId
      },
      data: {
        logoutAt: new Date()
      },
      include: {
        user: true
      }
    })

    const result: logAccessWithUserData = {
      id: log.id,
      userId: log.userId,
      name: log.user.name,
      loginAt: log.loginAt,
      logoutAt: log.logoutAt || undefined
    }

    return result
  }

}

export default accessLogRepository