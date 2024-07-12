import * as yup from 'yup'

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório')
})
