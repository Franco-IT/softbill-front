import { BBValues, InterValues, OFXValues, TypeMapEntry } from './dtos'
import { StringInput, SensitiveInput, FileInput, ImportedBanksInput, AccountingAccountsInput } from './inputs'
import { applyAccountNumberMask, applyAgencyNumberMask } from 'src/utils/inputs'

export type BBFields = keyof BBValues
export type InterFields = keyof InterValues
export type OFXFields = keyof OFXValues

const bbTypeMap: Record<BBFields, TypeMapEntry> = {
  bankClientId: {
    Input: StringInput,
    inputProps: { label: 'ClientID', required: false, placeholder: 'Ex: 123456' }
  },
  bankClientSecret: {
    Input: SensitiveInput,
    inputProps: { label: 'ClientSecret', required: false, placeholder: 'Ex: 123456' }
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
  },
  accountingAccountNumber: {
    Input: AccountingAccountsInput,
    inputProps: { label: 'Conta Contábel', required: true, placeholder: 'Ex: 1 - Fornecedor 1' }
  }
}

const interTypeMap: Record<InterFields, TypeMapEntry> = {
  bankClientId: {
    Input: StringInput,
    inputProps: { label: 'ClientID', required: true, placeholder: 'Ex: 123456' }
  },
  bankClientSecret: {
    Input: SensitiveInput,
    inputProps: { label: 'ClientSecret', required: true, placeholder: 'Ex: 123456' }
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
  },
  accountingAccountNumber: {
    Input: AccountingAccountsInput,
    inputProps: { label: 'Conta Contábel', required: true, placeholder: 'Ex: 1 - Fornecedor 1' }
  },
  files: {
    Input: FileInput,
    inputProps: { label: 'Certificado Digital', required: true, bank: 'INTER' }
  }
}

const OFXTypeMap: Record<OFXFields, TypeMapEntry> = {
  bank: {
    Input: ImportedBanksInput,
    inputProps: { label: 'Banco', required: true, placeholder: 'Selecione' }
  },
  accountNumber: {
    Input: StringInput,
    inputProps: { label: 'Número da Conta', required: true, placeholder: 'Ex: 12345678' },
    mask: applyAccountNumberMask
  },
  agencyNumber: {
    Input: StringInput,
    inputProps: { label: 'Número da Agência', required: true, min: 4, placeholder: 'Ex: 1234' },
    mask: applyAgencyNumberMask
  },
  accountingAccountNumber: {
    Input: AccountingAccountsInput,
    inputProps: { label: 'Conta Contábel', required: true, placeholder: 'Ex: 1 - Fornecedor 1' }
  }
}

export { bbTypeMap, interTypeMap, OFXTypeMap }
