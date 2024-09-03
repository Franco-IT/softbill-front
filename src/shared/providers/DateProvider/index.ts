import { ptBR } from 'date-fns/locale'
import { IDateProvider } from './IDateProvider'
import { format, formatDistanceToNow, parseISO } from 'date-fns'

export class DateProvider implements IDateProvider {
  getTimeSinceUpdate(date: Date): string {
    return formatDistanceToNow(date, { addSuffix: true, locale: ptBR })
  }

  formatDate(date: Date, options?: string): string {
    return format(date, options ? options : 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })
  }

  adjustDate(dateString: string): Date {
    return parseISO(dateString)
  }

  getCurrentDate(): Date {
    return new Date()
  }

  getCurrentMonth(): string {
    return format(new Date(), 'MMMM')
  }

  getMonthFromDate(date: Date): string {
    return format(date, 'MMMM', { locale: ptBR })
  }
}
