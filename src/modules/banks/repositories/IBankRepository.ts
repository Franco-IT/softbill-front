import { AxiosResponse } from 'axios'
import { ILinkingBankDTO } from '../dtos/ILinkingBankDTO'
import { IGetBanksByClientIdDTO } from '../dtos/IGetBanksByClientIdDTO'
import { IGetBanksDTO } from '../dtos/IGetBanksDTO'
import { IChangeBankStatusDTO } from '../dtos/IChangeBankStatusDTO'
import { ISetBankLogoDTO } from '../dtos/ISetBankLogoDTO'

export interface IBankRepository {
  linkingBank(data: ILinkingBankDTO): Promise<AxiosResponse>
  changeBankStatus(data: IChangeBankStatusDTO): Promise<AxiosResponse>
  setBankLogo(data: ISetBankLogoDTO): Promise<AxiosResponse>
  getBanks(params: IGetBanksDTO): Promise<AxiosResponse>
  getBanksByClientId(data: IGetBanksByClientIdDTO): Promise<AxiosResponse>
}
