import { BBValues, InterValues, TypeMapEntry } from './dtos'
import { StringInput, SensitiveInput, FileInput } from './inputs'
import { applyAccountNumberMask, applyAgencyNumberMask } from 'src/utils/inputs'

export type BBFields = keyof BBValues
export type InterFields = keyof InterValues

const bbTypeMap: Record<BBFields, TypeMapEntry> = {
  bankClientId: {
    Input: StringInput,
    inputProps: { label: 'ID do Cliente no Banco', required: false, placeholder: 'Ex: 123456' }
  },
  bankClientSecret: {
    Input: SensitiveInput,
    inputProps: { label: 'ID secreto do Cliente no Banco', required: false, placeholder: 'Ex: 123456' }
  },
  accountNumber: {
    Input: StringInput,
    inputProps: { label: 'Número da Conta', required: false, placeholder: 'Ex: 12345678' },
    mask: applyAccountNumberMask
  },
  agencyNumber: {
    Input: StringInput,
    inputProps: { label: 'Número da Agência', required: false, min: 4, placeholder: 'Ex: 1234' },
    mask: applyAgencyNumberMask
  }
}

const interTypeMap: Record<InterFields, TypeMapEntry> = {
  bankClientId: {
    Input: StringInput,
    inputProps: { label: 'ID do Cliente no Banco', required: true, placeholder: 'Ex: 123456' }
  },
  bankClientSecret: {
    Input: SensitiveInput,
    inputProps: { label: 'ID secreto do Cliente no Banco', required: true, placeholder: 'Ex: 123456' }
  },
  files: {
    Input: FileInput,
    inputProps: { label: 'Certificado Digital', required: true, bank: 'INTER' }
  }
}

export { bbTypeMap, interTypeMap }
