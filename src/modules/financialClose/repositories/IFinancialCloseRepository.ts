import { AxiosResponse } from 'axios'
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

export interface IFinancialCloseRepository {
  getMonthlyFinancialCloseStatistics(params: IGetMonthlyFinancialCloseStatisticsDTO): Promise<AxiosResponse>
  getMonthlyFinancialCloseDashboardData(params: IGetMonthlyFinancialClosesDashboardDataDTO): Promise<AxiosResponse>
  createMonthlyFinancialClose(data: ICreateMonthlyFinancialCloseDTO): Promise<AxiosResponse>
  getMonthlyFinancialCloseBank(data: IGetMonthlyFinancialCloseBankDTO): Promise<AxiosResponse>
  getMonthlyFinancialCloseBanks(params: IGetMonthlyFinancialCloseBanksDTO): Promise<AxiosResponse>
  createMonthlyFinancialCloseBank(data: ICreateMonthlyFinancialCloseBankDTO): Promise<AxiosResponse>
  updateMonthlyFinancialCloseBank(data: IUpdateMonthlyFinancialCloseBankDTO): Promise<AxiosResponse>
  deleteMonthlyFinancialCloseBank(data: IDeleteMonthlyFinancialCloseBankDTO): Promise<AxiosResponse>
  getBankStatement(data: IGetBankStatementDTO): Promise<AxiosResponse>
  sendStatementFile(data: ISendStatementFileDTO): Promise<AxiosResponse>
  deleteStatementFile(data: IDeleteStatementFileDTO): Promise<AxiosResponse>
  getBankTransactions(data: IGetBankTransactionsDTO): Promise<AxiosResponse>
  updateBankTransaction(data: IUpdateBankTransactionDTO): Promise<AxiosResponse>
  exportFile(data: IExportFileDTO): Promise<AxiosResponse>
  generateExportFile(data: IGenerateExportFileDTO): Promise<AxiosResponse>
  sendNotification(data: ISendNotificationDTO): Promise<AxiosResponse>
}
