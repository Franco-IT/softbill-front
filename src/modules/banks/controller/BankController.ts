import { LinkingBankUseCase } from '../useCases/LinkingBankUseCase'

export class BankController {
  private linkingBankUseCase: LinkingBankUseCase

  constructor(linkingBankUseCase: LinkingBankUseCase) {
    this.linkingBankUseCase = linkingBankUseCase
  }

  async linkingBank(data: any) {
    return this.linkingBankUseCase.execute(data)
  }
}
