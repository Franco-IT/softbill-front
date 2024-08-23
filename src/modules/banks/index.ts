import { BankController } from './controller/BankController'
import { BankRepository } from './repositories/BankRepository'
import { GetBanksByClientIdUseCase } from './useCases/GetBanksByClientIdUseCase'
import { LinkingBankUseCase } from './useCases/LinkingBankUseCase'

const bankRepository = new BankRepository()
const linkingBankUseCase = new LinkingBankUseCase(bankRepository)
const getBanksByClientIdUseCase = new GetBanksByClientIdUseCase(bankRepository)
const bankController = new BankController(linkingBankUseCase, getBanksByClientIdUseCase)

export { bankController }
