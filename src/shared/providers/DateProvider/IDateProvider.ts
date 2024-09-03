export interface IDateProvider {
  getTimeSinceUpdate(date: Date): string
  formatDate(date: Date): string
  getCurrentDate(): Date
  getCurrentMonth(): string
  getMonthFromDate(date: Date): string
}
