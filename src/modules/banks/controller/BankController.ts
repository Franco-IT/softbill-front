import { IChangeBankDisponibility } from '../dtos/IChangeBankDisponibility'
import { IChangeBankStatusDTO } from '../dtos/IChangeBankStatusDTO'
import { IGetBanksByClientIdDTO } from '../dtos/IGetBanksByClientIdDTO'
import { IGetBanksDTO } from '../dtos/IGetBanksDTO'
import { ILinkingBankDTO } from '../dtos/ILinkingBankDTO'
import { ISetBankLogoDTO } from '../dtos/ISetBankLogoDTO'
import { ChangeBankDisponibilityUseCase } from '../useCases/ChangeBankDisponibilityUseCase'
import { ChangeBankStatusUseCase } from '../useCases/ChangeBankStatusUseCase'
import { GetBanksByClientIdUseCase } from '../useCases/GetBanksByClientIdUseCase'
import { GetBanksUseCase } from '../useCases/GetBanksUseCase'
import { LinkingBankUseCase } from '../useCases/LinkingBankUseCase'
import { SetBankLogoUseCase } from '../useCases/SetBankLogoUseCase'

export class BankController {
  private linkingBankUseCase: LinkingBankUseCase
  private setBankLogoUseCase: SetBankLogoUseCase
  private changeBankStatusUseCase: ChangeBankStatusUseCase
  private changeBankDisponibilityUseCase: ChangeBankDisponibilityUseCase
  private getBanksUseCase: GetBanksUseCase
  private getBanksByClientIdUseCase: GetBanksByClientIdUseCase

  constructor(
    linkingBankUseCase: LinkingBankUseCase,
    setBankLogoUseCase: SetBankLogoUseCase,
    changeBankStatusUseCase: ChangeBankStatusUseCase,
    changeBankDisponibilityUseCase: ChangeBankDisponibilityUseCase,
    getBanksByClientIdUseCase: GetBanksByClientIdUseCase,
    getBanksUseCase: GetBanksUseCase
  ) {
    this.linkingBankUseCase = linkingBankUseCase
    this.setBankLogoUseCase = setBankLogoUseCase
    this.changeBankStatusUseCase = changeBankStatusUseCase
    this.changeBankDisponibilityUseCase = changeBankDisponibilityUseCase
    this.getBanksUseCase = getBanksUseCase
    this.getBanksByClientIdUseCase = getBanksByClientIdUseCase
  }

  async getBanks(params: IGetBanksDTO) {
    return this.getBanksUseCase.execute(params)
  }

  async getBanksByClientId(data: IGetBanksByClientIdDTO) {
    return this.getBanksByClientIdUseCase.execute(data)
  }

  async changeBankStatus(data: IChangeBankStatusDTO) {
    return this.changeBankStatusUseCase.execute(data)
  }

  async changeBankDisponibility(data: IChangeBankDisponibility) {
    return this.changeBankDisponibilityUseCase.execute(data)
  }

  async linkingBank(data: ILinkingBankDTO) {
    return this.linkingBankUseCase.execute(data)
  }

  async setBankLogo(data: ISetBankLogoDTO) {
    return this.setBankLogoUseCase.execute(data)
  }
}
