import * as yup from 'yup'

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
    files: yup.mixed().required('Arquivo obrigatório')
  })
}
