export const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount)
}

export const formatNameBank = (name: string) => {
  const nameArray = name.split(' ')

  return nameArray[0].length > 15 ? `${nameArray[0].slice(0, 15)}...` : name
}

export const formatNameUser = (name: string) => {
  const nameArray = name.split(' ')

  return nameArray[0].length > 15 ? `${nameArray[0].slice(0, 15)}...` : name
}
