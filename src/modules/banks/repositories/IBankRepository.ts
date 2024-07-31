import { AxiosResponse } from 'axios'
import { ILinkingBankDTO } from '../dtos/ILinkingBankDTO'

export interface IBankRepository {
  linkingBank(data: ILinkingBankDTO): Promise<AxiosResponse>
}
