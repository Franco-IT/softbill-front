import { BankController } from './controller/BankController'
import { BankRepository } from './repositories/BankRepository'
import { ChangeBankDisponibilityUseCase } from './useCases/ChangeBankDisponibilityUseCase'
import { ChangeBankStatusUseCase } from './useCases/ChangeBankStatusUseCase'
import { GetBanksByClientIdUseCase } from './useCases/GetBanksByClientIdUseCase'
import { GetBanksUseCase } from './useCases/GetBanksUseCase'
import { LinkingBankUseCase } from './useCases/LinkingBankUseCase'
import { SetBankLogoUseCase } from './useCases/SetBankLogoUseCase'

const bankRepository = new BankRepository()
const linkingBankUseCase = new LinkingBankUseCase(bankRepository)
const setBankLogoUseCase = new SetBankLogoUseCase(bankRepository)
const changeBankStatusUseCase = new ChangeBankStatusUseCase(bankRepository)
const changeBankDisponibilityUseCase = new ChangeBankDisponibilityUseCase(bankRepository)
const getBanksUseCase = new GetBanksUseCase(bankRepository)
const getBanksByClientIdUseCase = new GetBanksByClientIdUseCase(bankRepository)
const bankController = new BankController(
  linkingBankUseCase,
  setBankLogoUseCase,
  changeBankStatusUseCase,
  changeBankDisponibilityUseCase,
  getBanksByClientIdUseCase,
  getBanksUseCase
)

export { bankController }
