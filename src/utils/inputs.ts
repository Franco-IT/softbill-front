enum StatesEnum {
  AC = 'AC',
  AL = 'AL',
  AP = 'AP',
  AM = 'AM',
  BA = 'BA',
  CE = 'CE',
  DF = 'DF',
  ES = 'ES',
  GO = 'GO',
  MA = 'MA',
  MT = 'MT',
  MS = 'MS',
  MG = 'MG',
  PA = 'PA',
  PB = 'PB',
  PR = 'PR',
  PE = 'PE',
  PI = 'PI',
  RJ = 'RJ',
  RN = 'RN',
  RS = 'RS',
  RO = 'RO',
  RR = 'RR',
  SC = 'SC',
  SP = 'SP',
  SE = 'SE',
  TO = 'TO'
}

const applyCnpjMask = (value: string) => {
  if (!value) return value

  value = value.replace(/\D/g, '')

  if (value.length > 12) {
    value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  } else if (value.length > 8) {
    value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1.$2.$3/$4')
  } else if (value.length > 5) {
    value = value.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3')
  } else if (value.length > 2) {
    value = value.replace(/(\d{2})(\d{3})/, '$1.$2')
  }

  return value
}

const applyCpfMask = (value: string) => {
  value = value.replace(/\D/g, '')

  if (value.length > 9) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  } else if (value.length > 6) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3')
  } else if (value.length > 3) {
    value = value.replace(/(\d{3})(\d{3})/, '$1.$2')
  }

  return value
}

const applyDocumentMask = (value: string, type: string) => {
  switch (type) {
    case 'CPF':
      return applyCpfMask(value.slice(0, 14))
    case 'CNPJ':
      return applyCnpjMask(value.slice(0, 18))
    default:
      return value
  }
}

const applyPhoneMask = (value: string) => {
  if (!value) return value
  value = value.replace(/\D/g, '')

  switch (true) {
    case value.length > 10:
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
      break
    case value.length > 6:
      value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
      break
    case value.length > 2:
      value = value.replace(/(\d{2})(\d+)/, '($1) $2')
      break
    case value.length > 0:
      value = value.replace(/(\d*)/, '($1')
      break
    default:
      break
  }

  return value
}

const applyAccountNumberMask = (value: string) => {
  if (!value) return value

  value = value.replace(/\D/g, '')

  if (value.length > 7) value = value.slice(0, 7) + '-' + value.slice(7, 8)

  return value
}

const applyAgencyNumberMask = (value: string) => {
  if (!value) return value

  value = value.replace(/\D/g, '')

  if (value.length > 4) value = value.slice(0, 4)

  return value
}

export {
  applyDocumentMask,
  applyCpfMask,
  applyCnpjMask,
  applyPhoneMask,
  StatesEnum,
  applyAccountNumberMask,
  applyAgencyNumberMask
}
