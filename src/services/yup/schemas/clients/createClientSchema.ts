import * as yup from 'yup'

export const createClientSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  documentNumber: yup
    .string()
    .required('Número do CNPJ obrigatório')
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido')
    .max(18, 'CNPJ inválido'),
  collaboratorName: yup.string().required('Nome do colaborador obrigatório'),
  clientCompanyPhone: yup
    .string()
    .required('Telefone da empresa obrigatório')
    .matches(/^(\(?\d{2}\)?\s)?(\d{4,5}\-?\d{4})$/, 'Telefone inválido'),
  financialResponsible: yup.string().required('Responsável financeiro obrigatório'),
  fantasyName: yup.string().required('Nome fantasia obrigatório'),
  observations: yup.string()
})