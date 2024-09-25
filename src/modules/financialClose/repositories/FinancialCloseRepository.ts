import { AxiosResponse } from 'axios'
import { IFinancialCloseRepository } from './IFinancialCloseRepository'
import { IGetMonthlyFinancialCloseStatisticsDTO } from '../dtos/IGetMonthlyFinancialCloseStatisticsDTO'
import { IGetMonthlyFinancialClosesDashboardDataDTO } from '../dtos/IGetMonthlyFinancialClosesDashboardDataDTO'
import { api } from 'src/services/api'
import { IGetMonthlyFinancialCloseBankDTO } from '../dtos/IGetMonthlyFinancialCloseBankDTO'
import { IGetMonthlyFinancialCloseBanksDTO } from '../dtos/IGetMonthlyFinancialCloseBanksDTO'
import { IDeleteMonthlyFinancialCloseBankDTO } from '../dtos/IDeleteMonthlyFinancialCloseBankDTO'
import { ISendStatementFileDTO } from '../dtos/ISendStatementFileDTO'
import { IDeleteStatementFileDTO } from '../dtos/IDeleteStatementFileDTO'

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

  async deleteMonthlyFinancialCloseBank(data: IDeleteMonthlyFinancialCloseBankDTO): Promise<AxiosResponse<any, any>> {
    return api.delete('monthlyFinancialCloseBanks/' + data.id)
  }

  async sendStatementFile(data: ISendStatementFileDTO): Promise<AxiosResponse<any, any>> {
    return api.post('/monthlyFinancialCloseBanks/bank-monthly-financial-close/' + data.clientId, data.formData, {
      params: {
        referenceDate: data.referenceDate
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async deleteStatementFile(data: IDeleteStatementFileDTO): Promise<AxiosResponse<any, any>> {
    return api.delete('monthlyFinancialCloseBanks/imported-file/' + data.id)
  }
}
