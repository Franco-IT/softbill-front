export const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount)
}

export const formatNameBank = (name: string, limit?: number) => {
  if (!limit) limit = 20

  return name.length > limit ? `${name.slice(0, limit)}...` : name
}

export const formatNameUser = (name: string, limit?: number) => {
  if (!limit) limit = 20

  return name.length > limit ? `${name.slice(0, limit)}...` : name
}

export const formatName = (name: string, limit?: number) => {
  if (!limit) limit = 20

  return name.length > limit ? `${name.slice(0, limit)}...` : name
}
