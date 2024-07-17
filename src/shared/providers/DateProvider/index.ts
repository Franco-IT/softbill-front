import { ptBR } from 'date-fns/locale'
import { IDateProvider } from './IDateProvider'
import { format, formatDistanceToNow } from 'date-fns'

export class DateProvider implements IDateProvider {
  getTimeSinceUpdate(date: Date): string {
    return formatDistanceToNow(date, { addSuffix: true, locale: ptBR })
  }

  formatDate(date: Date): string {
    return format(date, 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })
  }

  getCurrentDate(): Date {
    return new Date()
  }
}
