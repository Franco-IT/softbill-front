import * as yup from 'yup'

export const resetPasswordSchema = yup.object().shape({
  newPassword: yup.string().min(8, 'minino de 8 caracteres').required('Senha obrigatória'),
  confirmPassword: yup
    .string()
    .required('Confirmação de senha obrigatória')
    .equals([yup.ref('newPassword')], 'As senhas não coincidem')
})
