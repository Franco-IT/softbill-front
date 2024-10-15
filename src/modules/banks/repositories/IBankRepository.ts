// DTOs
import { IGetBanksDTO } from '../dtos/IGetBanksDTO'
import { IChangeBankStatusDTO } from '../dtos/IChangeBankStatusDTO'
import { ISetBankLogoDTO } from '../dtos/ISetBankLogoDTO'
import { IChangeBankDisponibility } from '../dtos/IChangeBankDisponibility'
import { IGetBanksResponseDTO } from '../dtos/IGetBanksResponseDTO'

export interface IBankRepository {
  changeBankStatus(data: IChangeBankStatusDTO): Promise<void>
  changeBankDisponibility(data: IChangeBankDisponibility): Promise<void>
  setBankLogo(data: ISetBankLogoDTO): Promise<void>
  getBanks(params: IGetBanksDTO): Promise<IGetBanksResponseDTO>
}
