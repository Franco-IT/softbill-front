import * as yup from 'yup'

export const FILE_TYPES: { [key: string]: string[] } = {
  'text/csv': ['.csv']
}

export const MAX_FILE_SIZE = 2 * 1024 * 1024

export const isValidFileType = (file: File | null): boolean => {
  if (!file) return false

  const allowedExtensions = FILE_TYPES[file.type || 'text/csv']
  if (!allowedExtensions) return false

  const fileExtension = file.name.split('.').pop()

  return fileExtension ? allowedExtensions.includes(`.${fileExtension}`) : false
}

export const AddAccountingAccounts: { [key: string]: any } = yup.object().shape({})
