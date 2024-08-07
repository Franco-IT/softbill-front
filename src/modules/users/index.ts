import { UserController } from './controller/UserController'
import { UserRepository } from './repositories/UserRepository'
import { ChangePasswordUseCase } from './useCases/ChangePasswordUseCase'
import { CreateCounterUseCase } from './useCases/CreateCounterUseCase'
import { CreateUserUseCase } from './useCases/CreateUserUseCase'
import { DeleteUserUseCase } from './useCases/DeleteUserUseCase'
import { FirstAccessUserUseCase } from './useCases/FirstAccessUserUseCase'
import { SetUserAvatarUseCase } from './useCases/SetUserAvatarUseCase'
import { UpdateCounterUseCase } from './useCases/UpdateCounterUseCase'

const userRepository = new UserRepository()
const createUserUseCase = new CreateUserUseCase(userRepository)
const createCounterUseCase = new CreateCounterUseCase(userRepository)
const updateCounterUseCase = new UpdateCounterUseCase(userRepository)
const deleteUserUseCase = new DeleteUserUseCase(userRepository)
const changePasswordUseCase = new ChangePasswordUseCase(userRepository)
const setUserAvatarUseCase = new SetUserAvatarUseCase(userRepository)
const firstAccessUserUseCase = new FirstAccessUserUseCase(userRepository)
const userController = new UserController(
  createUserUseCase,
  createCounterUseCase,
  updateCounterUseCase,
  deleteUserUseCase,
  changePasswordUseCase,
  setUserAvatarUseCase,
  firstAccessUserUseCase
)

export { userController }
