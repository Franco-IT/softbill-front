import { ICreateMonthlyFinancialCloseBankDTO } from '../dtos/ICreateMonthlyFinancialCloseBankDTO'
import { ICreateMonthlyFinancialCloseDTO } from '../dtos/ICreateMonthlyFinancialCloseDTO'
import { IDeleteMonthlyFinancialCloseBankDTO } from '../dtos/IDeleteMonthlyFinancialCloseBankDTO'
import { IDeleteStatementFileDTO } from '../dtos/IDeleteStatementFileDTO'
import { IExportFileDTO } from '../dtos/IExportFileDTO'
import { IGenerateExportFileDTO } from '../dtos/IGenerateExportFileDTO'
import { IGetBankStatementDTO } from '../dtos/IGetBankStatementDTO'
import { IGetBankTransactionsDTO } from '../dtos/IGetBankTransactionsDTO'
import { IGetMonthlyFinancialCloseBankDTO } from '../dtos/IGetMonthlyFinancialCloseBankDTO'
import { IGetMonthlyFinancialCloseBanksDTO } from '../dtos/IGetMonthlyFinancialCloseBanksDTO'
import { IGetMonthlyFinancialClosesDashboardDataDTO } from '../dtos/IGetMonthlyFinancialClosesDashboardDataDTO'
import { IGetMonthlyFinancialCloseStatisticsDTO } from '../dtos/IGetMonthlyFinancialCloseStatisticsDTO'
import { ISendNotificationDTO } from '../dtos/ISendNotificationDTO'
import { ISendStatementFileDTO } from '../dtos/ISendStatementFileDTO'
import { IUpdateBankTransactionDTO } from '../dtos/IUpdateBankTransactionDTO'
import { IUpdateMonthlyFinancialCloseBankDTO } from '../dtos/IUpdateMonthlyFinancialCloseBankDTO'
import { CreateMonthlyFinancialCloseBankUseCase } from '../useCases/CreateMonthlyFinancialCloseBankUseCase'
import { CreateMonthlyFinancialCloseUseCase } from '../useCases/CreateMonthlyFinancialCloseUseCase'
import { DeleteMonthlyFinancialCloseBankUseCase } from '../useCases/DeleteMonthlyFinancialCloseBankUseCase'
import { DeleteStatementFileUseCase } from '../useCases/DeleteStatementFileUseCase'
import { ExportFileUseCase } from '../useCases/ExportFileUseCase'
import { GenerateExportFileUseCase } from '../useCases/GenerateExportFileUseCase'
import { GetBankStatementUseCase } from '../useCases/GetBankStatementUseCase'
import { GetBankTransactionsUseCase } from '../useCases/GetBankTransactionsUseCase'
import { GetMonthlyFinancialCloseBanksUseCase } from '../useCases/GetMonthlyFinancialCloseBanksUseCase'
import { GetMonthlyFinancialCloseBankUseCase } from '../useCases/GetMonthlyFinancialCloseBankUseCase'
import { GetMonthlyFinancialCloseDashboardDataUseCase } from '../useCases/GetMonthlyFinancialCloseDashboardDataUseCase'
import { GetMonthlyFinancialCloseStatisticsUseCase } from '../useCases/GetMonthlyFinancialCloseStatisticsUseCase'
import { SendNotificationUseCase } from '../useCases/SendNotificationUseCase'
import { SendStatementFileUseCase } from '../useCases/SendStatementFileUseCase'
import { UpdateBankTransactionUseCase } from '../useCases/UpdateBankTransactionUseCase'
import { UpdateMonthlyFinancialCloseBankUseCase } from '../useCases/UpdateMonthlyFinancialCloseBankUseCase'

export class FinancialCloseController {
  constructor(
    private getMonthlyFinancialCloseStatisticsUseCase: GetMonthlyFinancialCloseStatisticsUseCase,
    private getMonthlyFinancialCloseDashboardDataUseCase: GetMonthlyFinancialCloseDashboardDataUseCase,
    private createMonthlyFinancialCloseUseCase: CreateMonthlyFinancialCloseUseCase,
    private getMonthlyFinancialCloseBankUseCase: GetMonthlyFinancialCloseBankUseCase,
    private getMonthlyFinancialCloseBanksUseCase: GetMonthlyFinancialCloseBanksUseCase,
    private createMonthlyFinancialCloseBankUseCase: CreateMonthlyFinancialCloseBankUseCase,
    private updateMonthlyFinancialCloseBankUseCase: UpdateMonthlyFinancialCloseBankUseCase,
    private deleteMonthlyFinancialCloseBankUseCase: DeleteMonthlyFinancialCloseBankUseCase,
    private getBankStatementUseCase: GetBankStatementUseCase,
    private sendStatementFileUseCase: SendStatementFileUseCase,
    private deleteStatementFileUseCase: DeleteStatementFileUseCase,
    private getBankTransactionsUseCase: GetBankTransactionsUseCase,
    private updateBankTransactionUseCase: UpdateBankTransactionUseCase,
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

  async createMonthlyFinancialClose(data: ICreateMonthlyFinancialCloseDTO) {
    return this.createMonthlyFinancialCloseUseCase.execute(data)
  }

  async getMonthlyFinancialCloseBank(data: IGetMonthlyFinancialCloseBankDTO) {
    return this.getMonthlyFinancialCloseBankUseCase.execute(data)
  }

  async getMonthlyFinancialCloseBanks(params: IGetMonthlyFinancialCloseBanksDTO) {
    return this.getMonthlyFinancialCloseBanksUseCase.execute(params)
  }

  async createMonthlyFinancialCloseBank(data: ICreateMonthlyFinancialCloseBankDTO) {
    return this.createMonthlyFinancialCloseBankUseCase.execute(data)
  }

  async updateMonthlyFinancialCloseBank(data: IUpdateMonthlyFinancialCloseBankDTO) {
    return this.updateMonthlyFinancialCloseBankUseCase.execute(data)
  }

  async deleteMonthlyFinancialCloseBank(data: IDeleteMonthlyFinancialCloseBankDTO) {
    return this.deleteMonthlyFinancialCloseBankUseCase.execute(data)
  }

  async getBankStatement(data: IGetBankStatementDTO) {
    return this.getBankStatementUseCase.execute(data)
  }

  async sendStatementFile(data: ISendStatementFileDTO) {
    return this.sendStatementFileUseCase.execute(data)
  }

  async deleteStatementFile(data: IDeleteStatementFileDTO) {
    return this.deleteStatementFileUseCase.execute(data)
  }

  async getBankTransactions(data: IGetBankTransactionsDTO) {
    return this.getBankTransactionsUseCase.execute(data)
  }

  async updateBankTransaction(data: IUpdateBankTransactionDTO) {
    return this.updateBankTransactionUseCase.execute(data)
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
