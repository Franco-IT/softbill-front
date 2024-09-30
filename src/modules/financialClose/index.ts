import { FinancialCloseController } from './controller/FinancialCloseController'
import { FinancialCloseRepository } from './repositories/FinancialCloseRepository'
import { CreateMonthlyFinancialCloseBankUseCase } from './useCases/CreateMonthlyFinancialCloseBankUseCase'
import { CreateMonthlyFinancialCloseUseCase } from './useCases/CreateMonthlyFinancialCloseUseCase'
import { DeleteMonthlyFinancialCloseBankUseCase } from './useCases/DeleteMonthlyFinancialCloseBankUseCase'
import { DeleteStatementFileUseCase } from './useCases/DeleteStatementFileUseCase'
import { ExportFileUseCase } from './useCases/ExportFileUseCase'
import { GenerateExportFileUseCase } from './useCases/GenerateExportFileUseCase'
import { GetBankStatementUseCase } from './useCases/GetBankStatementUseCase'
import { GetBankTransactionsUseCase } from './useCases/GetBankTransactionsUseCase'
import { GetMonthlyFinancialCloseBanksUseCase } from './useCases/GetMonthlyFinancialCloseBanksUseCase'
import { GetMonthlyFinancialCloseBankUseCase } from './useCases/GetMonthlyFinancialCloseBankUseCase'
import { GetMonthlyFinancialCloseDashboardDataUseCase } from './useCases/GetMonthlyFinancialCloseDashboardDataUseCase'
import { GetMonthlyFinancialCloseStatisticsUseCase } from './useCases/GetMonthlyFinancialCloseStatisticsUseCase'
import { SendNotificationUseCase } from './useCases/SendNotificationUseCase'
import { SendStatementFileUseCase } from './useCases/SendStatementFileUseCase'
import { UpdateBankTransactionUseCase } from './useCases/UpdateBankTransactionUseCase'
import { UpdateMonthlyFinancialCloseBankUseCase } from './useCases/UpdateMonthlyFinancialCloseBankUseCase'

const financialCloseRepository = new FinancialCloseRepository()
const getMonthlyFinancialCloseStatisticsUseCase = new GetMonthlyFinancialCloseStatisticsUseCase(
  financialCloseRepository
)
const getMonthlyFinancialCloseDashboardDataUseCase = new GetMonthlyFinancialCloseDashboardDataUseCase(
  financialCloseRepository
)
const getMonthlyFinancialCloseBankUseCase = new GetMonthlyFinancialCloseBankUseCase(financialCloseRepository)
const getMonthlyFinancialCloseBanksUseCase = new GetMonthlyFinancialCloseBanksUseCase(financialCloseRepository)
const createMonthlyFinancialCloseUseCase = new CreateMonthlyFinancialCloseUseCase(financialCloseRepository)
const createMonthlyFinancialCloseBankUseCase = new CreateMonthlyFinancialCloseBankUseCase(financialCloseRepository)
const deleteMonthlyFinancialCloseBankUseCase = new DeleteMonthlyFinancialCloseBankUseCase(financialCloseRepository)
const updateMonthlyFinancialCloseBankUseCase = new UpdateMonthlyFinancialCloseBankUseCase(financialCloseRepository)
const getBankStatementUseCase = new GetBankStatementUseCase(financialCloseRepository)
const sendStatementFileUseCase = new SendStatementFileUseCase(financialCloseRepository)
const deleteStatementFileUseCase = new DeleteStatementFileUseCase(financialCloseRepository)
const getBankTransactionsUseCase = new GetBankTransactionsUseCase(financialCloseRepository)
const updateBankTransactionUseCase = new UpdateBankTransactionUseCase(financialCloseRepository)
const exportFileUseCase = new ExportFileUseCase(financialCloseRepository)
const generateExportFileUseCase = new GenerateExportFileUseCase(financialCloseRepository)
const sendNotificationUseCase = new SendNotificationUseCase(financialCloseRepository)

const financialCloseController = new FinancialCloseController(
  getMonthlyFinancialCloseStatisticsUseCase,
  getMonthlyFinancialCloseDashboardDataUseCase,
  createMonthlyFinancialCloseUseCase,
  getMonthlyFinancialCloseBankUseCase,
  getMonthlyFinancialCloseBanksUseCase,
  createMonthlyFinancialCloseBankUseCase,
  updateMonthlyFinancialCloseBankUseCase,
  deleteMonthlyFinancialCloseBankUseCase,
  getBankStatementUseCase,
  sendStatementFileUseCase,
  deleteStatementFileUseCase,
  getBankTransactionsUseCase,
  updateBankTransactionUseCase,
  exportFileUseCase,
  generateExportFileUseCase,
  sendNotificationUseCase
)

export { financialCloseController }
