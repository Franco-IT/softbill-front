import { IChangeBankDisponibility } from '../dtos/IChangeBankDisponibility'
import { IChangeBankStatusDTO } from '../dtos/IChangeBankStatusDTO'
import { IGetBanksDTO } from '../dtos/IGetBanksDTO'
import { ISetBankLogoDTO } from '../dtos/ISetBankLogoDTO'
import { ChangeBankDisponibilityUseCase } from '../useCases/ChangeBankDisponibilityUseCase'
import { ChangeBankStatusUseCase } from '../useCases/ChangeBankStatusUseCase'
import { GetBanksUseCase } from '../useCases/GetBanksUseCase'
import { SetBankLogoUseCase } from '../useCases/SetBankLogoUseCase'

export class BankController {
  constructor(
    private setBankLogoUseCase: SetBankLogoUseCase,
    private changeBankStatusUseCase: ChangeBankStatusUseCase,
    private changeBankDisponibilityUseCase: ChangeBankDisponibilityUseCase,
    private getBanksUseCase: GetBanksUseCase
  ) {}

  async getBanks(params: IGetBanksDTO) {
    return this.getBanksUseCase.execute(params)
  }

  async changeBankStatus(data: IChangeBankStatusDTO) {
    return this.changeBankStatusUseCase.execute(data)
  }

  async changeBankDisponibility(data: IChangeBankDisponibility) {
    return this.changeBankDisponibilityUseCase.execute(data)
  }

  async setBankLogo(data: ISetBankLogoDTO) {
    return this.setBankLogoUseCase.execute(data)
  }
}
