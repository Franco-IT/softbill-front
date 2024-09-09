import { BB, INTER, OFX } from '../forms/DynamicFormFields/defaultValues'

export type BBValues = {
  bankClientId: string | undefined
  bankClientSecret: string | undefined
  accountNumber: string | undefined
  agencyNumber: string | undefined
  bankId: string | undefined
  clientId: string | undefined
  generatedBy: string | undefined
  importedBank: string | undefined
}

export type InterValues = {
  bankClientId: string | undefined
  bankClientSecret: string | undefined
  bankId: string | undefined
  clientId: string | undefined
  generatedBy: string | undefined
  importedBank: string | undefined
  files: File[] | undefined
}

export type OFXValues = {
  importedBank: {
    id: string | undefined
    name: string | undefined
  }
  generatedBy: string | undefined
  clientId: string | undefined
}

export type Step0DefaultValues = Record<string, any>

export type Step1DefaultValues = {
  BB: BBValues
  inter: InterValues
  OFX: OFXValues
}

export type Step2DefaultValues = Record<string, any>

export type DefaultValuesByStep = Step0DefaultValues | Step1DefaultValues | Step2DefaultValues

export const defaultValuesByStep: DefaultValuesByStep[] = [
  {},
  {
    BB: BB,
    INTER: INTER,
    OFX: OFX
  },
  {}
]
