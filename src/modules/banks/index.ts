import { BankController } from './controller/BankController'
import { BankRepository } from './repositories/BankRepository'
import { ChangeBankStatusUseCase } from './useCases/ChangeBankStatusUseCase'
import { GetBanksByClientIdUseCase } from './useCases/GetBanksByClientIdUseCase'
import { GetBanksUseCase } from './useCases/GetBanksUseCase'
import { LinkingBankUseCase } from './useCases/LinkingBankUseCase'

const bankRepository = new BankRepository()
const linkingBankUseCase = new LinkingBankUseCase(bankRepository)
const changeBankStatusUseCase = new ChangeBankStatusUseCase(bankRepository)
const getBanksUseCase = new GetBanksUseCase(bankRepository)
const getBanksByClientIdUseCase = new GetBanksByClientIdUseCase(bankRepository)
const bankController = new BankController(
  linkingBankUseCase,
  changeBankStatusUseCase,
  getBanksByClientIdUseCase,
  getBanksUseCase
)

export { bankController }
