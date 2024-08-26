import { IChangeBankStatusDTO } from '../dtos/IChangeBankStatusDTO'
import { IGetBanksByClientIdDTO } from '../dtos/IGetBanksByClientIdDTO'
import { IGetBanksDTO } from '../dtos/IGetBanksDTO'
import { ILinkingBankDTO } from '../dtos/ILinkingBankDTO'
import { ChangeBankStatusUseCase } from '../useCases/ChangeBankStatusUseCase'
import { GetBanksByClientIdUseCase } from '../useCases/GetBanksByClientIdUseCase'
import { GetBanksUseCase } from '../useCases/GetBanksUseCase'
import { LinkingBankUseCase } from '../useCases/LinkingBankUseCase'

export class BankController {
  private linkingBankUseCase: LinkingBankUseCase
  private changeBankStatusUseCase: ChangeBankStatusUseCase
  private getBanksUseCase: GetBanksUseCase
  private getBanksByClientIdUseCase: GetBanksByClientIdUseCase

  constructor(
    linkingBankUseCase: LinkingBankUseCase,
    changeBankStatusUseCase: ChangeBankStatusUseCase,
    getBanksByClientIdUseCase: GetBanksByClientIdUseCase,
    getBanksUseCase: GetBanksUseCase
  ) {
    this.linkingBankUseCase = linkingBankUseCase
    this.changeBankStatusUseCase = changeBankStatusUseCase
    this.getBanksUseCase = getBanksUseCase
    this.getBanksByClientIdUseCase = getBanksByClientIdUseCase
  }

  async getBanks(data: IGetBanksDTO) {
    return this.getBanksUseCase.execute(data)
  }

  async getBanksByClientId(data: IGetBanksByClientIdDTO) {
    return this.getBanksByClientIdUseCase.execute(data)
  }

  async changeBankStatus(data: IChangeBankStatusDTO) {
    return this.changeBankStatusUseCase.execute(data)
  }

  async linkingBank(data: ILinkingBankDTO) {
    return this.linkingBankUseCase.execute(data)
  }
}
