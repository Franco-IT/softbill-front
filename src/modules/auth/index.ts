import { AuthController } from './controllers/AuthController'
import { UserAuthRepository } from './repositories/UserAuthRepository'
import { GetAuthUserUseCase } from './useCases/GetAuthUserUseCase'
import { LoginUseCase } from './useCases/LoginUseCase'
import { LogoutUseCase } from './useCases/LogoutUseCase'

const userAuthRepository = new UserAuthRepository()
const loginUseCase = new LoginUseCase(userAuthRepository)
const logoutUseCase = new LogoutUseCase(userAuthRepository)
const getAuthUserUseCase = new GetAuthUserUseCase(userAuthRepository)
const authController = new AuthController(loginUseCase, logoutUseCase, getAuthUserUseCase)

export { authController }
