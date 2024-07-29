import * as yup from 'yup'

export const FILE_TYPES_INTER: { [key: string]: string[] } = {
  'application/x-x509-ca-cert': ['.crt'],
  'application/x-key': ['.key']
}

export const filesTypesBanks: { [key: string]: any } = {
  INTER: FILE_TYPES_INTER
}

const MAX_FILE_SIZE = 2 * 1024 * 1024

const isValidFileType = (file: File | null, bank: string): boolean => {
  if (!file) return false

  const allowedExtensions = filesTypesBanks[bank][file.type || 'application/x-key']
  if (!allowedExtensions) return false

  const fileExtension = file.name.split('.').pop()

  return fileExtension ? allowedExtensions.includes(`.${fileExtension}`) : false
}

export const validationSchemaByBank: { [key: string]: any } = {
  BB: yup.object().shape({
    bankClientId: yup.string().required('ID do Cliente no Banco obrigatório'),
    bankClientSecret: yup.string().required('ID secreto do Cliente no Banco obrigatório'),
    accountNumber: yup.string().required('Número da conta obrigatório'),
    agencyNumber: yup.string().required('Número da agência obrigatório').min(4, 'Mínimo de 4 caracteres')
  }),
  INTER: yup.object().shape({
    bankClientId: yup.string().required('ID do Cliente no Banco obrigatório'),
    bankClientSecret: yup.string().required('ID secreto do Cliente no Banco obrigatório'),
    files: yup
      .array()
      .of(
        yup
          .mixed<File>()
          .required('Arquivos obrigatórios')
          .test('fileSize', 'O arquivo deve ter menos de 2MB', value => !value || value.size <= MAX_FILE_SIZE)
          .test('fileType', 'Tipo de arquivo não permitido', value => isValidFileType(value, 'INTER'))
      )
      .required('Arquivos obrigatórios')
      .min(2, 'Você deve fornecer dois arquivos, um do tipo .crt e outro do tipo .key')
  })
}
