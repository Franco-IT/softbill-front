export interface IChangePasswordAuthUserDTO {
  oldPassword: string
  newPassword: string
  confirmPassword: string
  userId: string
}