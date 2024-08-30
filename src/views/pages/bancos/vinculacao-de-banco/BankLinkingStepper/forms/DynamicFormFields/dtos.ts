import { ControllerRenderProps, FieldValues } from 'react-hook-form'

export type BBValues = {
  bankClientId: string | undefined
  bankClientSecret: string | undefined
  accountNumber: string | undefined
  agencyNumber: string | undefined
}

export type InterValues = {
  bankClientId: string | undefined
  bankClientSecret: string | undefined
  accountNumber: string | undefined
  agencyNumber: string | undefined
  files: File[]
}

export type OFXValues = {
  accountNumber: string | undefined
  agencyNumber: string | undefined
  importedBank: {
    id: string | undefined
    name: string | undefined
  }
}

export interface TypeMapEntry extends Partial<ControllerRenderProps<FieldValues>> {
  Input: React.ElementType
  inputProps: {
    label: string
    placeholder?: string
    required?: boolean
    min?: number
    bank?: string
  }
  options?: { value: string; label: string }[]
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  mask?: (value: string) => string
}
