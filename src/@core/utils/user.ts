export const verifyUserStatus = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return 'Ativo'
    case 'INACTIVE':
      return 'Inativo'
    default:
      return 'Situação desconhecida'
  }
}

export const verifyUserType = (role: string) => {
  switch (role) {
    case 'ADMIN':
      return 'Administrador'
    case 'CLIENT':
      return 'Cliente'
    case 'ACCOUNTING':
      return 'Contabilidade'
    case 'ACCOUNTANT':
      return 'Contador'
    default:
      return 'Tipo desconhecido'
  }
}
