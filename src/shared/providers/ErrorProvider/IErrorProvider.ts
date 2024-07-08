import { AxiosError } from 'axios'
import { AppError } from 'src/shared/errors/AppError'

export type IErrorProps = Error | AxiosError<unknown, any>

export type IErrorReference = { [errorStatus: number]: { [keyMessage: string]: string } }

export interface IErrorProvider {
  handle(error: IErrorProps, errorReference: IErrorReference, defaultErrorMessage: string): AppError
}
