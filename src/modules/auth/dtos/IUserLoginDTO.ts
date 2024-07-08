interface IUserLoginDTO {
  email: string
  password: string
}

interface IUserLoginResponseDTO {
  userId: string
  token: string
}

export type { IUserLoginDTO, IUserLoginResponseDTO }
