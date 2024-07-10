import { LoginUseCase } from './useCases/LoginUseCase'
import { LogoutUseCase } from './useCases/LogoutUseCase'
import { AuthController } from './controllers/AuthController'
import { GetAuthUserUseCase } from './useCases/GetAuthUserUseCase'
import { FirstAccessUseCase } from './useCases/FirstAccessUseCase'
import { UserAuthRepository } from './repositories/UserAuthRepository'

const userAuthRepository = new UserAuthRepository()
const loginUseCase = new LoginUseCase(userAuthRepository)
const logoutUseCase = new LogoutUseCase(userAuthRepository)
const getAuthUserUseCase = new GetAuthUserUseCase(userAuthRepository)
const firstAccessUseCase = new FirstAccessUseCase(userAuthRepository)
const authController = new AuthController(loginUseCase, logoutUseCase, getAuthUserUseCase, firstAccessUseCase)

export { authController }
