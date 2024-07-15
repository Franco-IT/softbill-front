import * as yup from 'yup'

export const updateCounterSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().email('E-mail inválido'),
  status: yup.string().required('Status obrigatório')
})
