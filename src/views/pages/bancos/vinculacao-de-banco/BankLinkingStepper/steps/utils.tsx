import { MenuItem } from '@mui/material'

export const getValidationSchema = (
  step: number,
  bankId: string,
  schemaByStep: any[],
  schemaByBank: { [key: string]: any }
) => {
  if (step === 1 && bankId && schemaByBank[bankId]) return schemaByBank[bankId]

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
