import { AxiosError } from 'axios'
import { IErrorProps, IErrorProvider, IErrorReference } from './IErrorProvider'
import { AppError } from 'src/shared/errors/AppError'

export class ErrorProvider implements IErrorProvider {
  handle(error: IErrorProps, errorReference: IErrorReference, defaultErrorMessage: string): AppError {
    if (error instanceof AxiosError) {
      if (error.response) {
        const { status, data } = error.response
        const { message } = data

        if (errorReference[status]) {
          if (errorReference[status][message]) return new AppError(errorReference[status][message], status)
        }

        return new AppError(defaultErrorMessage, status)
      }
    }

    return new AppError(defaultErrorMessage)
  }
}
