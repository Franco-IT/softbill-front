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
import { IGetBankStatementDTO } from '../dtos/IGetBankStatementDTO'
import { IGetBankTransactionsDTO } from '../dtos/IGetBankTransactionsDTO'
import { IUpdateBankTransactionDTO } from '../dtos/IUpdateBankTransactionDTO'
import { IUpdateMonthlyFinancialCloseBankDTO } from '../dtos/IUpdateMonthlyFinancialCloseBankDTO'
import { ICreateMonthlyFinancialCloseDTO } from '../dtos/ICreateMonthlyFinancialCloseDTO'
import { ICreateMonthlyFinancialCloseBankDTO } from '../dtos/ICreateMonthlyFinancialCloseBankDTO'

export class FinancialCloseRepository implements IFinancialCloseRepository {
  getMonthlyFinancialCloseDashboardData(params: IGetMonthlyFinancialClosesDashboardDataDTO): Promise<AxiosResponse> {
    return api.get('monthlyFinancialCloses/dashboard-accounting', { params })
  }

  async getMonthlyFinancialCloseStatistics(params: IGetMonthlyFinancialCloseStatisticsDTO): Promise<AxiosResponse> {
    return api.get('monthlyFinancialCloses/statistics', { params })
  }

  async createMonthlyFinancialClose(data: ICreateMonthlyFinancialCloseDTO): Promise<AxiosResponse> {
    return api.post('monthlyFinancialCloses', data)
  }

  async getMonthlyFinancialCloseBank(data: IGetMonthlyFinancialCloseBankDTO): Promise<AxiosResponse> {
    return api.get('monthlyFinancialCloseBanks/monthly-financial-close-accounting/' + data.id, {
      params: {
        referenceDate: data.referenceDate
      }
    })
  }

  async getMonthlyFinancialCloseBanks(params: IGetMonthlyFinancialCloseBanksDTO): Promise<AxiosResponse> {
    return api.get('monthlyFinancialCloseBanks', { params })
  }

  async createMonthlyFinancialCloseBank(data: ICreateMonthlyFinancialCloseBankDTO): Promise<AxiosResponse> {
    return api.post('monthlyFinancialCloseBanks', data)
  }

  async updateMonthlyFinancialCloseBank(data: IUpdateMonthlyFinancialCloseBankDTO): Promise<AxiosResponse> {
    const { monthlyFinancialCloseBankId, reqBody } = data

    return api.put('monthlyFinancialCloseBanks/' + monthlyFinancialCloseBankId, reqBody)
  }

  async deleteMonthlyFinancialCloseBank(data: IDeleteMonthlyFinancialCloseBankDTO): Promise<AxiosResponse> {
    return api.delete('monthlyFinancialCloseBanks/' + data.id)
  }

  async getBankStatement(data: IGetBankStatementDTO): Promise<AxiosResponse> {
    const { monthlyFinancialCloseId, params } = data

    return api.get('transactions/by-monthly-financial-close/' + monthlyFinancialCloseId, {
      params
    })
  }

  async sendStatementFile(data: ISendStatementFileDTO): Promise<AxiosResponse> {
    return api.post('monthlyFinancialCloseBanks/bank-monthly-financial-close/' + data.clientId, data.formData, {
      params: {
        referenceDate: data.referenceDate
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async deleteStatementFile(data: IDeleteStatementFileDTO): Promise<AxiosResponse> {
    return api.delete('monthlyFinancialCloseBanks/imported-file/' + data.id)
  }

  async getBankTransactions(data: IGetBankTransactionsDTO): Promise<AxiosResponse> {
    const { monthlyFinancialCloseId, params } = data

    return api.get('transactions/by-monthly-financial-close/' + monthlyFinancialCloseId, {
      params
    })
  }

  async updateBankTransaction(data: IUpdateBankTransactionDTO): Promise<AxiosResponse> {
    const { transactionId, reqBody } = data

    return api.put('transactions/' + transactionId, reqBody)
  }

  async exportFile(data: IExportFileDTO): Promise<AxiosResponse> {
    return api.get('files/download-file/' + data.fileId)
  }

  async generateExportFile(data: IGenerateExportFileDTO): Promise<AxiosResponse> {
    return api.get('monthlyFinancialCloseBanks/export/' + data.extractFileId)
  }

  async sendNotification(data: ISendNotificationDTO): Promise<AxiosResponse> {
    const { monthlyFinancialCloseBankId, params } = data

    return api.get('monthlyFinancialCloseBanks/send-notification/' + monthlyFinancialCloseBankId, {
      params
    })
  }
}
