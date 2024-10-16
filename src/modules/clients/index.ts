// Controllers
import { ClientsController } from './controller/ClientsController'

// Repositories
import { ClientsRepository } from './repositories/ClientsRepository'

// Use Cases
import { CreateClientUseCase } from './useCases/CreateClientUseCase'
import { DeleteClientUseCase } from './useCases/DeleteClientUseCase'
import { UpdateClientUseCase } from './useCases/UpdateClientUseCase'
import { GetClientUseCase } from './useCases/GetClientUseCase'
import { GetClientsUseCase } from './useCases/GetClientsUseCase'

const clientsRepository = new ClientsRepository()
const createClientUseCase = new CreateClientUseCase(clientsRepository)
const updateClientUseCase = new UpdateClientUseCase(clientsRepository)
const deleteClientUseCase = new DeleteClientUseCase(clientsRepository)
const getClientUseCase = new GetClientUseCase(clientsRepository)
const getClientsUseCase = new GetClientsUseCase(clientsRepository)
const clientsController = new ClientsController(
  createClientUseCase,
  updateClientUseCase,
  deleteClientUseCase,
  getClientUseCase,
  getClientsUseCase
)

export { clientsController }
