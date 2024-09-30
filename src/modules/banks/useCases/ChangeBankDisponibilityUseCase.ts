import { errorProvider } from 'src/shared/providers'
import { IChangeBankDisponibility } from '../dtos/IChangeBankDisponibility'
import { IBankRepository } from '../repositories/IBankRepository'

export class ChangeBankDisponibilityUseCase {
  constructor(private bankRepository: IBankRepository) {}

  async execute(data: IChangeBankDisponibility) {
    try {
      const response = await this.bankRepository.changeBankDisponibility(data)

      return response.data
    } catch (error: any) {
      throw errorProvider.handle(error, {}, 'Erro ao alterar disponibilidade do banco.')
    }
  }
}
