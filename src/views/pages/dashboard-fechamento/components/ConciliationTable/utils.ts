export interface ConciliationProps {
  id: string
  bank: string
  cc: string
  cd: string
  value: string
  description: string
  type: string
  origin: string | null
  createdAt: string
}

export const conciliations: ConciliationProps[] = [
  {
    id: 'asdnasijdioajdioas',
    bank: 'Banco do Brasil',
    cc: '1234567-8',
    cd: '1234567-8',
    description: 'Transferência PIX',
    value: 'R$ 100,00',
    origin: null,
    type: 'DEBIT',
    createdAt: '2021-10-10T00:00:00.000Z'
  },
  {
    id: 'anfniaosndioansdnas',
    bank: 'Banco do Brasil',
    cc: '1234567-8',
    cd: '1234567-8',
    value: 'R$ 1000,00',
    description: 'Lojas Americanas',
    origin: null,
    type: 'CREDIT',
    createdAt: '2021-10-10T00:00:00.000Z'
  }
]
