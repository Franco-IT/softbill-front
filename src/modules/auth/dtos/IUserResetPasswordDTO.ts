export interface IUserResetPasswordDTO {
  token: string
  newPassword: string
  confirmPassword: string
}