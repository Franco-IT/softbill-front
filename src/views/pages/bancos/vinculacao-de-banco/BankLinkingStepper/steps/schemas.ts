import * as yup from 'yup'

export const baseValidationSchemaByStep = [
  yup.object(),
  yup.object().shape({
    bankId: yup.string().required('Banco obrigatório')
  }),
  yup.object()
]

export const OFXValidationSchema = yup.object().shape({
  importedBank: yup.string().required('Banco obrigatório'),
  accountNumber: yup.string().required('Número da conta obrigatório'),
  agencyNumber: yup.string().required('Número da agência obrigatório').min(4, 'Mínimo de 4 caracteres')
})
