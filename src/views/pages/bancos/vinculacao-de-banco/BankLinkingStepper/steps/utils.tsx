import { MenuItem } from '@mui/material'

interface BankNameType {
  [key: string]: string
}

export const bankName: BankNameType = {
  BB: 'Banco do Brasil',
  INTER: 'Banco Inter',
  ITAU: 'Itaú',
  SANTANDER: 'Santander',
  SAFRA: 'Safra',
  CAIXA: 'Caixa Econômica Federal',
  NUBANK: 'Nubank',
  C6: 'C6 Bank',
  BRADESCO: 'Bradesco',
  QUORA: 'Quora',
  SICREDI: 'Sicredi',
  BTG: 'BTG Pactual',
  BANRISUL: 'Banrisul',
  PAN: 'Banco Pan',
  ABC: 'ABC Brasil',
  SICOOB: 'Sicoob',
  OTHER: 'Outro'
}

export const getValidationSchema = (
  step: number,
  bank: string,
  operationType: string,
  schemaByStep: any[],
  schemaByBank: { [key: string]: any },
  schemaByImport: any
) => {
  if (step === 1 && operationType === 'IMPORT') return schemaByImport
  if (step === 1 && bank && schemaByBank[bank]) return schemaByBank[bank]
  if (step === 1 && !operationType) return schemaByStep[0]

  return schemaByStep[step]
}

export const handleCheckBanksAvailable = (banks: any[], userBanks: any[]) => {
  if (!banks || !userBanks)
    return (
      <MenuItem value='' disabled>
        Nenhum banco disponível
      </MenuItem>
    )

  const banksAvailable = banks.filter((bank: any) => {
    return !userBanks.find((userBank: any) => userBank.bankId === bank._id)
  })

  if (banksAvailable.length === 0)
    return (
      <MenuItem
        value=''
        disabled
        sx={{
          color: 'white'
        }}
      >
        Nenhum banco disponível
      </MenuItem>
    )

  return banksAvailable.map((bank: any) => (
    <MenuItem key={bank._id} value={bank._id}>
      {bank.name}
    </MenuItem>
  ))
}
