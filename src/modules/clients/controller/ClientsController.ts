// DTOs
import { ICreateClientDTO } from '../dtos/ICreateClientDTO'
import { IUpdateClientDTO } from '../dtos/IUpdateClientDTO'
import { IDeleteClientDTO } from '../dtos/IDeleteClientDTO'
import { IGetClientDTO } from '../dtos/IGetClientDTO'
import { IGetClientsDTO } from '../dtos/IGetClientsDTO'

// Use Cases
import { CreateClientUseCase } from '../useCases/CreateClientUseCase'
import { UpdateClientUseCase } from '../useCases/UpdateClientUseCase'
import { DeleteClientUseCase } from '../useCases/DeleteClientUseCase'
import { GetClientUseCase } from '../useCases/GetClientUseCase'
import { GetClientsUseCase } from '../useCases/GetClientsUseCase'

export class ClientsController {
  constructor(
    private createClientUseCase: CreateClientUseCase,
    private updateClientUseCase: UpdateClientUseCase,
    private deleteClientUseCase: DeleteClientUseCase,
    private getClientUseCase: GetClientUseCase,
    private getClientsUseCase: GetClientsUseCase
  ) {}

  async create(data: ICreateClientDTO) {
    return this.createClientUseCase.execute(data)
  }

  async update(data: IUpdateClientDTO) {
    return this.updateClientUseCase.execute(data)
  }

  async delete(data: IDeleteClientDTO) {
    return this.deleteClientUseCase.execute(data)
  }

  async findById(data: IGetClientDTO) {
    return this.getClientUseCase.execute(data)
  }

  async findAll(params: IGetClientsDTO) {
    return this.getClientsUseCase.execute(params)
  }
}
