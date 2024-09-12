import * as yup from 'yup'

export const changePasswordSchema = yup.object().shape({
  newPassword: yup.string().required('Senha obrigatória').min(8, 'A senha deve ter no mínimo 8 caracteres'),
  confirmPassword: yup
    .string()
    .required('Confirmação de nova senha obrigatória')
    .equals([yup.ref('newPassword')], 'As senhas não coincidem')
})
