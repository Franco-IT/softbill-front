import * as yup from 'yup'

export const updateClientSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  status: yup.string().required('Status obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  documentType: yup.string().required('Tipo de documento obrigatório'),
  documentNumber: yup
    .string()
    .required('Número do documento obrigatório')
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido')
    .max(18, 'CNPJ inválido'),
  additionalData: yup.object().shape({
    fantasyName: yup.string().required('Nome fantasia obrigatório'),
    financialResponsible: yup.string().required('Responsável financeiro obrigatório'),
    collaboratorName: yup.string().required('Nome do colaborador obrigatório'),
    clientCompanyPhone: yup
      .string()
      .required('Telefone da empresa obrigatório')
      .matches(/^(\(?\d{2}\)?\s)?(\d{4,5}\-?\d{4})$/, 'Telefone inválido')
      .min(14, 'Telefone inválido')
      .max(15, 'Telefone inválido')
  }),
  observations: yup.string()
})
