export const BB = {
  bankClientId: '',
  bankClientSecret: '',
  accountNumber: '',
  agencyNumber: '',
  bankId: '',
  clientId: '',
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
  files: []
}

export const OFX = {
  clientId: '',
  accountNumber: '',
  agencyNumber: '',
  generatedBy: 'IMPORT'
}

export const defaultValuesObj: { [key: string]: any } = {
  '001': BB,
  '077': INTER,
  OFX: OFX
}
