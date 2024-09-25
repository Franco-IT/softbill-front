import { IDeleteMonthlyFinancialCloseBankDTO } from '../dtos/IDeleteMonthlyFinancialCloseBankDTO'
import { IGetMonthlyFinancialCloseBankDTO } from '../dtos/IGetMonthlyFinancialCloseBankDTO'
import { IGetMonthlyFinancialCloseBanksDTO } from '../dtos/IGetMonthlyFinancialCloseBanksDTO'
import { IGetMonthlyFinancialClosesDashboardDataDTO } from '../dtos/IGetMonthlyFinancialClosesDashboardDataDTO'
import { IGetMonthlyFinancialCloseStatisticsDTO } from '../dtos/IGetMonthlyFinancialCloseStatisticsDTO'
import { DeleteMonthlyFinancialCloseBankUseCase } from '../useCases/DeleteMonthlyFinancialCloseBankUseCase'
import { GetMonthlyFinancialCloseBanksUseCase } from '../useCases/GetMonthlyFinancialCloseBanksUseCase'
import { GetMonthlyFinancialCloseBankUseCase } from '../useCases/GetMonthlyFinancialCloseBankUseCase'
import { GetMonthlyFinancialCloseDashboardDataUseCase } from '../useCases/GetMonthlyFinancialCloseDashboardDataUseCase'
import { GetMonthlyFinancialCloseStatisticsUseCase } from '../useCases/GetMonthlyFinancialCloseStatisticsUseCase'

export class FinancialCloseController {
  private getMonthlyFinancialCloseStatisticsUseCase: GetMonthlyFinancialCloseStatisticsUseCase
  private getMonthlyFinancialCloseDashboardDataUseCase: GetMonthlyFinancialCloseDashboardDataUseCase
  private getMonthlyFinancialCloseBankUseCase: GetMonthlyFinancialCloseBankUseCase
  private getMonthlyFinancialCloseBanksUseCase: GetMonthlyFinancialCloseBanksUseCase
  private deleteMonthlyFinancialCloseBankUseCase: DeleteMonthlyFinancialCloseBankUseCase

  constructor(
    getMonthlyFinancialCloseStatisticsUseCase: GetMonthlyFinancialCloseStatisticsUseCase,
    getMonthlyFinancialCloseDashboardDataUseCase: GetMonthlyFinancialCloseDashboardDataUseCase,
    getMonthlyFinancialCloseBankUseCase: GetMonthlyFinancialCloseBankUseCase,
    getMonthlyFinancialCloseBanksUseCase: GetMonthlyFinancialCloseBanksUseCase,
    deleteMonthlyFinancialCloseBankUseCase: DeleteMonthlyFinancialCloseBankUseCase
  ) {
    this.getMonthlyFinancialCloseStatisticsUseCase = getMonthlyFinancialCloseStatisticsUseCase
    this.getMonthlyFinancialCloseDashboardDataUseCase = getMonthlyFinancialCloseDashboardDataUseCase
    this.getMonthlyFinancialCloseBankUseCase = getMonthlyFinancialCloseBankUseCase
    this.getMonthlyFinancialCloseBanksUseCase = getMonthlyFinancialCloseBanksUseCase
    this.deleteMonthlyFinancialCloseBankUseCase = deleteMonthlyFinancialCloseBankUseCase
  }

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
}
