import { timeUserAccess } from "../dto/userDTO";
import accessLogService from "../service/accessLog.service";
import { Response } from 'express';

class accessLogController {
  private accessLogSvc: accessLogService

  constructor() {
    this.accessLogSvc = new accessLogService()
  }

  async getReport(res: Response): Promise<Response<timeUserAccess[]>> {
    const log: timeUserAccess[] = await this.accessLogSvc.reportUserAccess()

    return res.status(200).json(log)
  }
}

export default accessLogController