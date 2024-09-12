import { UserController } from './controller/UserController'
import { UserRepository } from './repositories/UserRepository'
import { ChangePasswordUseCase } from './useCases/ChangePasswordUseCase'
import { CreateClientUseCase } from './useCases/CreateClientUseCase'
import { CreateCounterUseCase } from './useCases/CreateCounterUseCase'
import { CreateUserUseCase } from './useCases/CreateUserUseCase'
import { DeleteUserUseCase } from './useCases/DeleteUserUseCase'
import { FindByIDUseCase } from './useCases/FindByIDUseCase'
import { FirstAccessUserUseCase } from './useCases/FirstAccessUserUseCase'
import { GetClientsUseCase } from './useCases/GetClientsUseCase'
import { GetUsersUseCase } from './useCases/GetUsersUseCase'
import { SetUserAvatarUseCase } from './useCases/SetUserAvatarUseCase'
import { UpdateClientUseCase } from './useCases/UpdateClientUseCase'
import { UpdateCounterUseCase } from './useCases/UpdateCounterUseCase'

const userRepository = new UserRepository()
const getUsersUseCase = new GetUsersUseCase(userRepository)
const getClientsUseCase = new GetClientsUseCase(userRepository)
const findByIDUseCase = new FindByIDUseCase(userRepository)
const createUserUseCase = new CreateUserUseCase(userRepository)
const createClientUseCase = new CreateClientUseCase(userRepository)
const createCounterUseCase = new CreateCounterUseCase(userRepository)
const updateCounterUseCase = new UpdateCounterUseCase(userRepository)
const updateClientUseCase = new UpdateClientUseCase(userRepository)
const deleteUserUseCase = new DeleteUserUseCase(userRepository)
const changePasswordUseCase = new ChangePasswordUseCase(userRepository)
const setUserAvatarUseCase = new SetUserAvatarUseCase(userRepository)
const firstAccessUserUseCase = new FirstAccessUserUseCase(userRepository)
const userController = new UserController(
  getUsersUseCase,
  getClientsUseCase,
  findByIDUseCase,
  createUserUseCase,
  createClientUseCase,
  createCounterUseCase,
  updateCounterUseCase,
  updateClientUseCase,
  deleteUserUseCase,
  changePasswordUseCase,
  setUserAvatarUseCase,
  firstAccessUserUseCase
)

export { userController }
