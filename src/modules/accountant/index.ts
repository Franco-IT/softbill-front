// Controllers
import { AccountantsController } from './controller/AccountantsController'

// Repositories
import { AccountantsRepository } from './repositories/AccountantsRepository'

// Use Cases
import { CreateAccountantUseCase } from './useCases/CreateAccountantUseCase'
import { DeleteAccountantUseCase } from './useCases/DeleteAccountantUseCase'
import { UpdateAccountantUseCase } from './useCases/UpdateAccountantUseCase'
import { GetAccountantUseCase } from './useCases/GetAccountantUseCase'
import { GetAccountantsUseCase } from './useCases/GetAccountantsUseCase'

const countersRepository = new AccountantsRepository()
const createAccountantUseCase = new CreateAccountantUseCase(countersRepository)
const updateAccountantUseCase = new UpdateAccountantUseCase(countersRepository)
const deleteAccountantUseCase = new DeleteAccountantUseCase(countersRepository)
const getCounterUseCase = new GetAccountantUseCase(countersRepository)
const getAccountantsUseCase = new GetAccountantsUseCase(countersRepository)
const accountantsController = new AccountantsController(
  createAccountantUseCase,
  updateAccountantUseCase,
  deleteAccountantUseCase,
  getCounterUseCase,
  getAccountantsUseCase
)

export { accountantsController }
