import { FinancialCloseController } from './controller/FinancialCloseController'
import { FinancialCloseRepository } from './repositories/FinancialCloseRepository'
import { DeleteMonthlyFinancialCloseBankUseCase } from './useCases/DeleteMonthlyFinancialCloseBankUseCase'
import { GetMonthlyFinancialCloseBanksUseCase } from './useCases/GetMonthlyFinancialCloseBanksUseCase'
import { GetMonthlyFinancialCloseBankUseCase } from './useCases/GetMonthlyFinancialCloseBankUseCase'
import { GetMonthlyFinancialCloseDashboardDataUseCase } from './useCases/GetMonthlyFinancialCloseDashboardDataUseCase'
import { GetMonthlyFinancialCloseStatisticsUseCase } from './useCases/GetMonthlyFinancialCloseStatisticsUseCase'

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
const financialCloseController = new FinancialCloseController(
  getMonthlyFinancialCloseStatisticsUseCase,
  getMonthlyFinancialCloseDashboardDataUseCase,
  getMonthlyFinancialCloseBankUseCase,
  getMonthlyFinancialCloseBanksUseCase,
  deleteMonthlyFinancialCloseBankUseCase
)

export { financialCloseController }
