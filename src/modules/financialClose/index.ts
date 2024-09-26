import { FinancialCloseController } from './controller/FinancialCloseController'
import { FinancialCloseRepository } from './repositories/FinancialCloseRepository'
import { DeleteMonthlyFinancialCloseBankUseCase } from './useCases/DeleteMonthlyFinancialCloseBankUseCase'
import { DeleteStatementFileUseCase } from './useCases/DeleteStatementFileUseCase'
import { ExportFileUseCase } from './useCases/ExportFileUseCase'
import { GenerateExportFileUseCase } from './useCases/GenerateExportFileUseCase'
import { GetMonthlyFinancialCloseBanksUseCase } from './useCases/GetMonthlyFinancialCloseBanksUseCase'
import { GetMonthlyFinancialCloseBankUseCase } from './useCases/GetMonthlyFinancialCloseBankUseCase'
import { GetMonthlyFinancialCloseDashboardDataUseCase } from './useCases/GetMonthlyFinancialCloseDashboardDataUseCase'
import { GetMonthlyFinancialCloseStatisticsUseCase } from './useCases/GetMonthlyFinancialCloseStatisticsUseCase'
import { SendNotificationUseCase } from './useCases/SendNotificationUseCase'
import { SendStatementFileUseCase } from './useCases/SendStatementFileUseCase'

const financialCloseRepository = new FinancialCloseRepository()
const getMonthlyFinancialCloseStatisticsUseCase = new GetMonthlyFinancialCloseStatisticsUseCase(
  financialCloseRepository
)
const getMonthlyFinancialCloseDashboardDataUseCase = new GetMonthlyFinancialCloseDashboardDataUseCase(
  financialCloseRepository
)
const getMonthlyFinancialCloseBankUseCase = new GetMonthlyFinancialCloseBankUseCase(financialCloseRepository)
const getMonthlyFinancialCloseBanksUseCase = new GetMonthlyFinancialCloseBanksUseCase(financialCloseRepository)
const deleteMonthlyFinancialCloseBankUseCase = new DeleteMonthlyFinancialCloseBankUseCase(financialCloseRepository)
const sendStatementFileUseCase = new SendStatementFileUseCase(financialCloseRepository)
const deleteStatementFileUseCase = new DeleteStatementFileUseCase(financialCloseRepository)
const exportFileUseCase = new ExportFileUseCase(financialCloseRepository)
const generateExportFileUseCase = new GenerateExportFileUseCase(financialCloseRepository)
const sendNotificationUseCase = new SendNotificationUseCase(financialCloseRepository)

const financialCloseController = new FinancialCloseController(
  getMonthlyFinancialCloseStatisticsUseCase,
  getMonthlyFinancialCloseDashboardDataUseCase,
  getMonthlyFinancialCloseBankUseCase,
  getMonthlyFinancialCloseBanksUseCase,
  deleteMonthlyFinancialCloseBankUseCase,
  sendStatementFileUseCase,
  deleteStatementFileUseCase,
  exportFileUseCase,
  generateExportFileUseCase,
  sendNotificationUseCase
)

export { financialCloseController }
