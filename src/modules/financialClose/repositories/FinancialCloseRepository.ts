import { AxiosResponse } from 'axios'
import { api } from 'src/services/api'
import { IFinancialCloseRepository } from './IFinancialCloseRepository'
import { IGetMonthlyFinancialCloseStatisticsDTO } from '../dtos/IGetMonthlyFinancialCloseStatisticsDTO'
import { IGetMonthlyFinancialClosesDashboardDataDTO } from '../dtos/IGetMonthlyFinancialClosesDashboardDataDTO'
import { IGetMonthlyFinancialCloseBankDTO } from '../dtos/IGetMonthlyFinancialCloseBankDTO'
import { IGetMonthlyFinancialCloseBanksDTO } from '../dtos/IGetMonthlyFinancialCloseBanksDTO'
import { IDeleteMonthlyFinancialCloseBankDTO } from '../dtos/IDeleteMonthlyFinancialCloseBankDTO'
import { ISendStatementFileDTO } from '../dtos/ISendStatementFileDTO'
import { IDeleteStatementFileDTO } from '../dtos/IDeleteStatementFileDTO'
import { IExportFileDTO } from '../dtos/IExportFileDTO'
import { ISendNotificationDTO } from '../dtos/ISendNotificationDTO'
import { IGenerateExportFileDTO } from '../dtos/IGenerateExportFileDTO'

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
    return api.post('monthlyFinancialCloseBanks/bank-monthly-financial-close/' + data.clientId, data.formData, {
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

  async exportFile(data: IExportFileDTO): Promise<AxiosResponse> {
    return api.get('files/download-file/' + data.fileId)
  }

  async generateExportFile(data: IGenerateExportFileDTO): Promise<AxiosResponse> {
    return api.get('monthlyFinancialCloseBanks/export/' + data.extractFileId)
  }

  async sendNotification(data: ISendNotificationDTO): Promise<AxiosResponse<any, any>> {
    const { monthlyFinancialCloseBankId, params } = data

    return api.get('monthlyFinancialCloseBanks/send-notification/' + monthlyFinancialCloseBankId, {
      params
    })
  }
}
