import { BankController } from './controller/BankController'
import { BankRepository } from './repositories/BankRepository'
import { ChangeBankDisponibilityUseCase } from './useCases/ChangeBankDisponibilityUseCase'
import { ChangeBankStatusUseCase } from './useCases/ChangeBankStatusUseCase'
import { GetBanksUseCase } from './useCases/GetBanksUseCase'
import { SetBankLogoUseCase } from './useCases/SetBankLogoUseCase'

const bankRepository = new BankRepository()
const setBankLogoUseCase = new SetBankLogoUseCase(bankRepository)
const changeBankStatusUseCase = new ChangeBankStatusUseCase(bankRepository)
const changeBankDisponibilityUseCase = new ChangeBankDisponibilityUseCase(bankRepository)
const getBanksUseCase = new GetBanksUseCase(bankRepository)
const bankController = new BankController(
  setBankLogoUseCase,
  changeBankStatusUseCase,
  changeBankDisponibilityUseCase,
  getBanksUseCase
)

export { bankController }
