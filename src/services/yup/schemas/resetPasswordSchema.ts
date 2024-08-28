import * as yup from 'yup'

export const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('Senha obrigatória')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&])[a-zA-Z0-9!@#$%^&]{8,20}$/,
      'A senha deve conter entre 8 a 20 caracteres, incluindo pelo menos um número e um caractere especial'
    ),
  confirmPassword: yup
    .string()
    .required('Confirmação de senha obrigatória')
    .equals([yup.ref('newPassword')], 'As senhas não coincidem')
})
