import { errorProvider } from 'src/shared/providers'
import { ISendNotificationDTO } from '../dtos/ISendNotificationDTO'
import { IFinancialCloseRepository } from '../repositories/IFinancialCloseRepository'
import { errors } from '../errors'

export class SendNotificationUseCase {
  constructor(private financialCloseRepository: IFinancialCloseRepository) {}

  async execute(data: ISendNotificationDTO) {
    try {
      const response = await this.financialCloseRepository.sendNotification(data)

      return response
    } catch (error) {
      throw errorProvider.handle(error, errors, 'Error ao enviar notificação, tente novamente mais tarde.')
    }
  }
}
