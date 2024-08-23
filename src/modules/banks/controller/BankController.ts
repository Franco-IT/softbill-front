import { IGetBanksByClientIdDTO } from '../dtos/IGetBanksByClientIdDTO'
import { GetBanksByClientIdUseCase } from '../useCases/GetBanksByClientIdUseCase'
import { LinkingBankUseCase } from '../useCases/LinkingBankUseCase'

export class BankController {
  private linkingBankUseCase: LinkingBankUseCase
  private getBanksByClientIdUseCase: GetBanksByClientIdUseCase

  constructor(linkingBankUseCase: LinkingBankUseCase, getBanksByClientIdUseCase: GetBanksByClientIdUseCase) {
    this.linkingBankUseCase = linkingBankUseCase
    this.getBanksByClientIdUseCase = getBanksByClientIdUseCase
  }

  async getBanksByClientId(data: IGetBanksByClientIdDTO) {
    return this.getBanksByClientIdUseCase.execute(data)
  }

  async linkingBank(data: any) {
    return this.linkingBankUseCase.execute(data)
  }
}
