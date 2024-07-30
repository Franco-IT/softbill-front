import { BBValues, InterValues, OFXValues, TypeMapEntry } from './dtos'
import { StringInput, SensitiveInput, FileInput, SelectInput } from './inputs'
import { applyAccountNumberMask, applyAgencyNumberMask } from 'src/utils/inputs'

export type BBFields = keyof BBValues
export type InterFields = keyof InterValues
export type OFXFields = keyof OFXValues

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

const OFXTypeMap: Record<OFXFields, TypeMapEntry> = {
  importedBank: {
    Input: SelectInput,
    inputProps: { label: 'Nome do Banco', required: true, placeholder: 'Selecione' },
    options: [
      {
        value: 'BB',
        label: 'Banco do Brasil'
      },
      {
        value: 'ITAU',
        label: 'Itaú'
      },
      {
        value: 'SANTANDER',
        label: 'Santander'
      },
      {
        value: 'SAFRA',
        label: 'Safra'
      },
      {
        value: 'CAIXA',
        label: 'Caixa Econômica Federal'
      },
      {
        value: 'NUBANK',
        label: 'Nubank'
      },
      {
        value: 'C6',
        label: 'C6 Bank'
      },
      {
        value: 'INTER',
        label: 'Banco Inter'
      },
      {
        value: 'BRADESCO',
        label: 'Bradesco'
      },
      {
        value: 'QUORA',
        label: 'Quora'
      },
      {
        value: 'SICREDI',
        label: 'Sicredi'
      },
      {
        value: 'BTG',
        label: 'BTG Pactual'
      },
      {
        value: 'BANRISUL',
        label: 'Banrisul'
      },
      {
        value: 'PAN',
        label: 'Banco Pan'
      },
      {
        value: 'ABC',
        label: 'ABC Brasil'
      },
      {
        value: 'SICOOB',
        label: 'Sicoob'
      },
      {
        value: 'OTHER',
        label: 'Outro'
      }
    ]
  }
}

export { bbTypeMap, interTypeMap, OFXTypeMap }
