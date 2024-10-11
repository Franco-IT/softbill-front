export interface IDateProvider {
  getTimeSinceUpdate(date: Date): string
  formatDate(date: Date): string
  adjustDate(dateString: string): Date
  getCurrentDate(): Date
  getCurrentMonth(): string
  getPreviousMonths(date: Date, previousQuantity: number): Date
  getLaterMonths(date: Date, laterQuantity: number): Date
  getMonthFromDate(date: Date): string
}
