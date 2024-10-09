import * as yup from 'yup'

export const UpdateAccountingAccounts = yup.object().shape({
  transactionType: yup.string().required('Tipo de transação obrigatório'),
  number: yup.string().required('Número da conta obrigatório'),
  description: yup.string().required('Descrição obrigatória')
})
