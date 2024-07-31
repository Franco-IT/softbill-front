import { BankController } from './controller/BankController'
import { BankRepository } from './repositories/BankRepository'
import { LinkingBankUseCase } from './useCases/LinkingBankUseCase'

const bankRepository = new BankRepository()
const linkingBankUseCase = new LinkingBankUseCase(bankRepository)
const bankController = new BankController(linkingBankUseCase)

export { bankController }
