import { ClientsController } from './controller/ClientsController'
import { ClientsRepository } from './repositories/ClientsRepository'
import { CreateAccountingAccountUseCase } from './useCases/CreateAccountingAccountUseCase'
import { DeleteAccountingAccountUseCase } from './useCases/DeleteAccountingAccountUseCase'
import { GetAccountingAccountsByClientUseCase } from './useCases/GetAccountingAccountsByClientUseCase'
import { UpdateAccountingAccountUseCase } from './useCases/UpdateAccountingAccountUseCase'

const clientRepository = new ClientsRepository()
const getAccountingAccountsByClientUseCase = new GetAccountingAccountsByClientUseCase(clientRepository)
const createAccountingAccountUseCase = new CreateAccountingAccountUseCase(clientRepository)
const updateAccountingAccountUseCase = new UpdateAccountingAccountUseCase(clientRepository)
const deleteAccountingAccountUseCase = new DeleteAccountingAccountUseCase(clientRepository)
const clientsController = new ClientsController(
  getAccountingAccountsByClientUseCase,
  createAccountingAccountUseCase,
  updateAccountingAccountUseCase,
  deleteAccountingAccountUseCase
)

export { clientsController }
