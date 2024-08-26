import * as yup from 'yup'

export const createAccountingSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  status: yup.string().required('Status obrigatório'),
  password: yup.string().min(8, 'A senha deve ter no mínimo 8 caracteres').required('Senha obrigatória'),
  confirmPassword: yup
    .string()
    .required('Confirmação de senha obrigatória')
    .equals([yup.ref('password')], 'As senhas não coincidem'),
  documentType: yup.string().required('Tipo de documento obrigatório'),
  documentNumber: yup
    .string()
    .required('Número do documento obrigatório')
    .when('documentType', ([documentType], schema) => {
      switch (documentType) {
        case 'CPF':
          return schema.matches(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/, 'CPF inválido').max(14, 'CPF inválido')
        case 'CNPJ':
          return schema.matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido').max(18, 'CNPJ inválido')
        default:
          return schema
      }
    })
})
