import { timeUserAccess } from "../dto/userDTO";
import accessLogRepository from "../repository/accessLog.repository"

class accessLogService {
  private accessLogRepo: accessLogRepository

  constructor() { 
    this.accessLogRepo = new accessLogRepository()
  }

  async reportUserAccess(): Promise<timeUserAccess[]> {
    const log = await this.accessLogRepo.getReportUserAccess()

    const accessReport = log.map((item) => ({
      date: item.loginAt,
      accessTotalInMinute: Math.floor((item.logoutAt?.getTime()? item.logoutAt?.getTime() - item.loginAt.getTime() : 0) / (1000 * 60))
    }))

    const groupedReport = accessReport.reduce((result, log) => {
      const key = log.date.toISOString().split('T')[0]

      if (!result[key]) {
        result[key] = { date: log.date, accessTotalInMinute: 0 };
      }

      result[key].accessTotalInMinute += log.accessTotalInMinute;

      return result;
    }, {} as Record<string, { date: Date; accessTotalInMinute: number }>);

    return Object.values(groupedReport)
  }
}

export default accessLogService
