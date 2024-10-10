// Controllers
import { AccountingAccountsController } from './controller/AccountingAccountsController'

// Repositories
import { AccountingAccountsRepository } from './repositories/AccountingAccountsRepository'

// Use Cases
import { CreateAccountingAccountUseCase } from './useCases/CreateAccountingAccountUseCase'
import { DeleteAccountingAccountUseCase } from './useCases/DeleteAccountingAccountUseCase'
import { GetAccountingAccountsByClientUseCase } from './useCases/GetAccountingAccountsByClientUseCase'
import { UpdateAccountingAccountUseCase } from './useCases/UpdateAccountingAccountUseCase'

const accountingAccountsRepository = new AccountingAccountsRepository()
const getAccountingAccountsByClientUseCase = new GetAccountingAccountsByClientUseCase(accountingAccountsRepository)
const createAccountingAccountUseCase = new CreateAccountingAccountUseCase(accountingAccountsRepository)
const updateAccountingAccountUseCase = new UpdateAccountingAccountUseCase(accountingAccountsRepository)
const deleteAccountingAccountUseCase = new DeleteAccountingAccountUseCase(accountingAccountsRepository)
const accountingAccountsController = new AccountingAccountsController(
  getAccountingAccountsByClientUseCase,
  createAccountingAccountUseCase,
  updateAccountingAccountUseCase,
  deleteAccountingAccountUseCase
)

export { accountingAccountsController }
