export interface IDateProvider {
  getTimeSinceUpdate(date: Date): string
  formatDate(date: Date): string
  adjustDate(dateString: string): Date
  getCurrentDate(): Date
  getCurrentMonth(): string
  getLastMonth(date: Date): Date
  getMonthFromDate(date: Date): string
}
