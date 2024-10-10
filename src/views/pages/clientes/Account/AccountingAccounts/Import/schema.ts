import * as yup from 'yup'

export const FILE_TYPES: { [key: string]: string[] } = {
  'application/pdf': ['.pdf']
}

export const MAX_FILE_SIZE = 5 * 1024 * 1024

export const isValidFileType = (file: File | null): boolean => {
  if (!file) return false

  const allowedExtensions = FILE_TYPES[file.type || 'application/pdf']
  if (!allowedExtensions) return false

  const fileExtension = file.name.split('.').pop()

  return fileExtension ? allowedExtensions.includes(`.${fileExtension}`) : false
}

export const ImportAccountingAccounts = yup.object().shape({
  files: yup
    .array()
    .of(
      yup
        .mixed<File>()
        .required('Arquivo obrigatório')
        .test('fileSize', 'O arquivo deve ter menos de 5MB', value => !value || value.size <= MAX_FILE_SIZE)
        .test('fileType', 'Tipo de arquivo não permitido', value => isValidFileType(value))
    )
    .required('Arquivos obrigatórios')
    .min(1, 'Você precisa fornecer o arquivo do tipo PDF para continuar')
})
