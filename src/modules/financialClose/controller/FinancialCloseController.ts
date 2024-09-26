import { IDeleteMonthlyFinancialCloseBankDTO } from '../dtos/IDeleteMonthlyFinancialCloseBankDTO'
import { IDeleteStatementFileDTO } from '../dtos/IDeleteStatementFileDTO'
import { IExportFileDTO } from '../dtos/IExportFileDTO'
import { IGenerateExportFileDTO } from '../dtos/IGenerateExportFileDTO'
import { IGetMonthlyFinancialCloseBankDTO } from '../dtos/IGetMonthlyFinancialCloseBankDTO'
import { IGetMonthlyFinancialCloseBanksDTO } from '../dtos/IGetMonthlyFinancialCloseBanksDTO'
import { IGetMonthlyFinancialClosesDashboardDataDTO } from '../dtos/IGetMonthlyFinancialClosesDashboardDataDTO'
import { IGetMonthlyFinancialCloseStatisticsDTO } from '../dtos/IGetMonthlyFinancialCloseStatisticsDTO'
import { ISendNotificationDTO } from '../dtos/ISendNotificationDTO'
import { ISendStatementFileDTO } from '../dtos/ISendStatementFileDTO'
import { DeleteMonthlyFinancialCloseBankUseCase } from '../useCases/DeleteMonthlyFinancialCloseBankUseCase'
import { DeleteStatementFileUseCase } from '../useCases/DeleteStatementFileUseCase'
import { ExportFileUseCase } from '../useCases/ExportFileUseCase'
import { GenerateExportFileUseCase } from '../useCases/GenerateExportFileUseCase'
import { GetMonthlyFinancialCloseBanksUseCase } from '../useCases/GetMonthlyFinancialCloseBanksUseCase'
import { GetMonthlyFinancialCloseBankUseCase } from '../useCases/GetMonthlyFinancialCloseBankUseCase'
import { GetMonthlyFinancialCloseDashboardDataUseCase } from '../useCases/GetMonthlyFinancialCloseDashboardDataUseCase'
import { GetMonthlyFinancialCloseStatisticsUseCase } from '../useCases/GetMonthlyFinancialCloseStatisticsUseCase'
import { SendNotificationUseCase } from '../useCases/SendNotificationUseCase'
import { SendStatementFileUseCase } from '../useCases/SendStatementFileUseCase'

export class FinancialCloseController {
  constructor(
    private getMonthlyFinancialCloseStatisticsUseCase: GetMonthlyFinancialCloseStatisticsUseCase,
    private getMonthlyFinancialCloseDashboardDataUseCase: GetMonthlyFinancialCloseDashboardDataUseCase,
    private getMonthlyFinancialCloseBankUseCase: GetMonthlyFinancialCloseBankUseCase,
    private getMonthlyFinancialCloseBanksUseCase: GetMonthlyFinancialCloseBanksUseCase,
    private deleteMonthlyFinancialCloseBankUseCase: DeleteMonthlyFinancialCloseBankUseCase,
    private sendStatementFileUseCase: SendStatementFileUseCase,
    private deleteStatementFileUseCase: DeleteStatementFileUseCase,
    private exportFileUseCase: ExportFileUseCase,
    private generateExportFileUseCase: GenerateExportFileUseCase,
    private sendNotificationUseCase: SendNotificationUseCase
  ) {}

  async getMonthlyFinancialCloseStatistics(params: IGetMonthlyFinancialCloseStatisticsDTO) {
    return this.getMonthlyFinancialCloseStatisticsUseCase.execute(params)
  }

  async getMonthlyFinancialCloseDashboardData(params: IGetMonthlyFinancialClosesDashboardDataDTO) {
    return this.getMonthlyFinancialCloseDashboardDataUseCase.execute(params)
  }

  async getMonthlyFinancialCloseBank(data: IGetMonthlyFinancialCloseBankDTO) {
    return this.getMonthlyFinancialCloseBankUseCase.execute(data)
  }

  async getMonthlyFinancialCloseBanks(params: IGetMonthlyFinancialCloseBanksDTO) {
    return this.getMonthlyFinancialCloseBanksUseCase.execute(params)
  }

  async deleteMonthlyFinancialCloseBank(data: IDeleteMonthlyFinancialCloseBankDTO) {
    return this.deleteMonthlyFinancialCloseBankUseCase.execute(data)
  }

  async sendStatementFile(data: ISendStatementFileDTO) {
    return this.sendStatementFileUseCase.execute(data)
  }

  async deleteStatementFile(data: IDeleteStatementFileDTO) {
    return this.deleteStatementFileUseCase.execute(data)
  }

  async exportFile(data: IExportFileDTO) {
    return this.exportFileUseCase.execute(data)
  }

  async generateExportFile(data: IGenerateExportFileDTO) {
    return this.generateExportFileUseCase.execute(data)
  }

  async sendNotification(data: ISendNotificationDTO) {
    return this.sendNotificationUseCase.execute(data)
  }
}
