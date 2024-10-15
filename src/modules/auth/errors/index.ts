export const errors = {
  400: {
    'Authorization is missing': 'Token de autenticação não encontrado, faça login novamente.',
    'Authorization token is missing': 'Token de autenticação não encontrado, faça login novamente.',
    'Invalid user': 'Usuário inválido, faça login novamente.',
    'This session is already in use': 'Esta sessão já está em uso, faça login novamente.',
    'Invalid token': 'Token inválido, faça login novamente.'
  },
  404: {
    'User Not found': 'Email ou senha inválidos, verifique os dados e tente novamente.',
    'Email or Password Invalid': 'Email ou senha inválidos, verifique os dados e tente novamente.'
  },
  409: {
    'Refresh token Invalid': 'Token de atualização inválido, faça login novamente.',
    'Invalid old password!': 'Senha antiga inválida, tente novamente.',
    'New password can not match the old password!': 'A nova senha não pode ser igual a senha antiga, tente novamente.',
    "Passwords doesn't match!": 'As senhas não conferem, tente novamente.',
    'Refresh Token expired, please generate new validation link':
      'Token de atualização expirado, gere um novo link de validação.',
    'Email or Password Invalid': 'Email ou senha inválidos, verifique os dados e tente novamente.'
  }
}
