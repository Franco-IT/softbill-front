import * as yup from 'yup'

export const baseValidationSchemaByStep = [
  yup.object(),
  yup.object().shape({
    bankId: yup.string().required('Banco obrigatório')
  }),
  yup.object()
]

export const OFXValidationSchema = yup.object().shape({
  importedBank: yup.string().required('Banco obrigatório')
})
