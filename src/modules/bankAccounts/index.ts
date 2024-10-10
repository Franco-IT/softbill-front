// Repository
import { BankAccountsRepository } from './repositories/BankAccountsRepository'

// Use Cases
import { GetBankAccountsByClientIdUseCase } from './useCases/GetBankAccountsByClientIdUseCase'
import { CreateBankAccountUseCase } from './useCases/CreateBankAccountUseCase'
import { DeleteBankAccountUseCase } from './useCases/DeleteBankAccountUseCase'

// Controller
import { BankAccountsController } from './controller/BankAccountsController'

const bankAccountsRepository = new BankAccountsRepository()
const getBankAccountsByClientIdUseCase = new GetBankAccountsByClientIdUseCase(bankAccountsRepository)
const createBankAccountUseCase = new CreateBankAccountUseCase(bankAccountsRepository)
const deleteBankAccountUseCase = new DeleteBankAccountUseCase(bankAccountsRepository)
const bankAccountsController = new BankAccountsController(
  getBankAccountsByClientIdUseCase,
  createBankAccountUseCase,
  deleteBankAccountUseCase
)

export { bankAccountsController }
