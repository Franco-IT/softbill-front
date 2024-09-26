import { AxiosResponse } from 'axios'
import { IGetMonthlyFinancialCloseStatisticsDTO } from '../dtos/IGetMonthlyFinancialCloseStatisticsDTO'
import { IGetMonthlyFinancialClosesDashboardDataDTO } from '../dtos/IGetMonthlyFinancialClosesDashboardDataDTO'
import { IGetMonthlyFinancialCloseBankDTO } from '../dtos/IGetMonthlyFinancialCloseBankDTO'
import { IGetMonthlyFinancialCloseBanksDTO } from '../dtos/IGetMonthlyFinancialCloseBanksDTO'
import { IDeleteMonthlyFinancialCloseBankDTO } from '../dtos/IDeleteMonthlyFinancialCloseBankDTO'
import { ISendStatementFileDTO } from '../dtos/ISendStatementFileDTO'
import { IDeleteStatementFileDTO } from '../dtos/IDeleteStatementFileDTO'
import { IExportFileDTO } from '../dtos/IExportFileDTO'

export interface IFinancialCloseRepository {
  getMonthlyFinancialCloseStatistics(params: IGetMonthlyFinancialCloseStatisticsDTO): Promise<AxiosResponse>
  getMonthlyFinancialCloseDashboardData(params: IGetMonthlyFinancialClosesDashboardDataDTO): Promise<AxiosResponse>
  getMonthlyFinancialCloseBank(data: IGetMonthlyFinancialCloseBankDTO): Promise<AxiosResponse>
  getMonthlyFinancialCloseBanks(params: IGetMonthlyFinancialCloseBanksDTO): Promise<AxiosResponse>
  deleteMonthlyFinancialCloseBank(data: IDeleteMonthlyFinancialCloseBankDTO): Promise<AxiosResponse>
  sendStatementFile(data: ISendStatementFileDTO): Promise<AxiosResponse>
  deleteStatementFile(data: IDeleteStatementFileDTO): Promise<AxiosResponse>
  exportFile(data: IExportFileDTO): Promise<AxiosResponse>
}
