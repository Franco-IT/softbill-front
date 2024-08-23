import { AxiosResponse } from 'axios'
import { ILinkingBankDTO } from '../dtos/ILinkingBankDTO'
import { IGetBanksByClientIdDTO } from '../dtos/IGetBanksByClientIdDTO'

export interface IBankRepository {
  linkingBank(data: ILinkingBankDTO): Promise<AxiosResponse>
  getBanksByClientId(data: IGetBanksByClientIdDTO): Promise<AxiosResponse>
}
