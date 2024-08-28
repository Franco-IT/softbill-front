import { LoginUseCase } from './useCases/LoginUseCase'
import { LogoutUseCase } from './useCases/LogoutUseCase'
import { AuthController } from './controllers/AuthController'
import { GetAuthUserUseCase } from './useCases/GetAuthUserUseCase'
import { FirstAccessUseCase } from './useCases/FirstAccessUseCase'
import { UserAuthRepository } from './repositories/UserAuthRepository'
import { EmailResetPasswordUseCase } from './useCases/EmailResetPasswordUseCase'
import { ResetPasswordUseCase } from './useCases/ResetPasswordUseCase'
import { ChangePasswordUseCase } from './useCases/ChangePasswordUseCase'

const userAuthRepository = new UserAuthRepository()
const loginUseCase = new LoginUseCase(userAuthRepository)
const logoutUseCase = new LogoutUseCase(userAuthRepository)
const getAuthUserUseCase = new GetAuthUserUseCase(userAuthRepository)
const changePasswordUseCase = new ChangePasswordUseCase(userAuthRepository)
const firstAccessUseCase = new FirstAccessUseCase(userAuthRepository)
const resetPasswordUseCase = new ResetPasswordUseCase(userAuthRepository)
const emailResetPasswordUseCase = new EmailResetPasswordUseCase(userAuthRepository)
const authController = new AuthController(
  loginUseCase,
  logoutUseCase,
  getAuthUserUseCase,
  changePasswordUseCase,
  firstAccessUseCase,
  resetPasswordUseCase,
  emailResetPasswordUseCase
)

export { authController }
