import { BB, INTER, OFX } from '../forms/DynamicFormFields/defaultValues'

export type BBValues = {
  bankClientId: string | undefined
  bankClientSecret: string | undefined
  accountNumber: string | undefined
  agencyNumber: string | undefined
  bankId: string | undefined
  clientId: string | undefined
  generatedBy: string | undefined
  bank: {
    id: string | undefined
    name: string | undefined
  }
}

export type InterValues = {
  bankClientId: string | undefined
  bankClientSecret: string | undefined
  bankId: string | undefined
  clientId: string | undefined
  generatedBy: string | undefined
  bank: {
    id: string | undefined
    name: string | undefined
  }
  files: File[] | undefined
}

export type OFXValues = {
  bank: {
    id: string | undefined
    name: string | undefined
  }
  generatedBy: string | undefined
  clientId: string | undefined
}

export type Step0DefaultValues = Record<string, any>

export type Step1DefaultValues = {
  '001': BBValues
  '077': InterValues
  OFX: OFXValues
}

export type Step2DefaultValues = Record<string, any>

export type DefaultValuesByStep = Step0DefaultValues | Step1DefaultValues | Step2DefaultValues

export const defaultValuesByStep: DefaultValuesByStep[] = [
  {},
  {
    '001': BB,
    '077': INTER,
    OFX: OFX
  },
  {}
]
