export const BB = {
  bankClientId: '',
  bankClientSecret: '',
  accountNumber: '',
  agencyNumber: '',
  bankId: '',
  clientId: '',
  accountingAccountNumber: '',
  generatedBy: 'API'
}

export const INTER = {
  bankClientId: '',
  bankClientSecret: '',
  accountNumber: '',
  agencyNumber: '',
  bankId: '',
  clientId: '',
  generatedBy: 'API',
  accountingAccountNumber: '',
  files: []
}

export const OFX = {
  clientId: '',
  accountNumber: '',
  agencyNumber: '',
  generatedBy: 'IMPORT',
  accountingAccountNumber: ''
}

export const defaultValuesObj: { [key: string]: any } = {
  '001': BB,
  '077': INTER,
  OFX: OFX
}
