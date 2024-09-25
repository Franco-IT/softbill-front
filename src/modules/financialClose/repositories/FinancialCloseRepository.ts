import { AxiosResponse } from 'axios'
import { IFinancialCloseRepository } from './IFinancialCloseRepository'
import { IGetMonthlyFinancialCloseStatisticsDTO } from '../dtos/IGetMonthlyFinancialCloseStatisticsDTO'
import { IGetMonthlyFinancialClosesDashboardDataDTO } from '../dtos/IGetMonthlyFinancialClosesDashboardDataDTO'
import { api } from 'src/services/api'
import { IGetMonthlyFinancialCloseBankDTO } from '../dtos/IGetMonthlyFinancialCloseBankDTO'
import { IGetMonthlyFinancialCloseBanksDTO } from '../dtos/IGetMonthlyFinancialCloseBanksDTO'
import { IDeleteMonthlyFinancialCloseBankDTO } from '../dtos/IDeleteMonthlyFinancialCloseBankDTO'

export class FinancialCloseRepository implements IFinancialCloseRepository {
  getMonthlyFinancialCloseDashboardData(
    params: IGetMonthlyFinancialClosesDashboardDataDTO
  ): Promise<AxiosResponse<any, any>> {
    return api.get('monthlyFinancialCloses/dashboard-accounting', { params })
  }

  async getMonthlyFinancialCloseStatistics(
    params: IGetMonthlyFinancialCloseStatisticsDTO
  ): Promise<AxiosResponse<any, any>> {
    return api.get('monthlyFinancialCloses/statistics', { params })
  }

  async getMonthlyFinancialCloseBank(data: IGetMonthlyFinancialCloseBankDTO): Promise<AxiosResponse<any, any>> {
    return api.get('monthlyFinancialCloseBanks/monthly-financial-close-accounting/' + data.id, {
      params: {
        referenceDate: data.referenceDate
      }
    })
  }

  async getMonthlyFinancialCloseBanks(params: IGetMonthlyFinancialCloseBanksDTO): Promise<AxiosResponse<any, any>> {
    return api.get('monthlyFinancialCloseBanks', { params })
  }

  async deleteMonthlyFinancialCloseBank(data: IDeleteMonthlyFinancialCloseBankDTO): Promise<AxiosResponse> {
    return api.delete('monthlyFinancialCloseBanks/' + data.id)
  }
}
