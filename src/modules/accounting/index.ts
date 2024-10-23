// Controllers
import { AccountingsController } from './controller/AccountingsController'

// Repositories
import { AccountingsRepository } from './repositories/AccountingsRepository'

// Use Cases
import { CreateAccountingUseCase } from './useCases/CreateAccountingUseCase'
import { DeleteAccountingUseCase } from './useCases/DeleteAccountingUseCase'
import { UpdateAccountingUseCase } from './useCases/UpdateAccountingUseCase'
import { GetAccountingUseCase } from './useCases/GetAccountingUseCase'
import { GetAccountingsUseCase } from './useCases/GetAccountingsUseCase'

const accountingsRepository = new AccountingsRepository()
const createAccountingUseCase = new CreateAccountingUseCase(accountingsRepository)
const updateAccountingUseCase = new UpdateAccountingUseCase(accountingsRepository)
const deleteAccountingUseCase = new DeleteAccountingUseCase(accountingsRepository)
const getAccountingUseCase = new GetAccountingUseCase(accountingsRepository)
const getAccountingsUseCase = new GetAccountingsUseCase(accountingsRepository)
const accountingsController = new AccountingsController(
  createAccountingUseCase,
  updateAccountingUseCase,
  deleteAccountingUseCase,
  getAccountingUseCase,
  getAccountingsUseCase
)

export { accountingsController }
