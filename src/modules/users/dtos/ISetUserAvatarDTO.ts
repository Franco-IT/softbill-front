export interface ISetUserAvatarDTO {
  file: File
  userId: string
  uploadType: 'PROFILE' | 'LOGO'
}
