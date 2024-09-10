export const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount)
}

export const formatNameBank = (name: string) => (name.length > 20 ? `${name.slice(0, 20)}...` : name)

export const formatNameUser = (name: string) => (name.length > 20 ? `${name.slice(0, 20)}...` : name)
