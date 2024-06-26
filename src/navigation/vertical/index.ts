// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      action: 'read',
      auth: true,
      subject: ['ADMIN', 'ACCOUNTING'],
      icon: 'tabler:smart-home'
    },
    {
      title: 'Usuários',
      subtitle: 'Ver Usuários',
      path: '/usuarios',
      action: 'create',
      auth: true,
      subject: 'ADMIN',
      icon: 'tabler:users',
      avatarColor: 'primary'
    },
    {
      title: 'Contabilidade',
      subtitle: 'Ver Usuários Contabilidade',
      path: '/contabilidades',
      action: 'create',
      auth: true,
      subject: 'ADMIN',
      icon: 'map:accounting',
      avatarColor: 'warning'
    },
    {
      title: 'Bancos',
      subtitle: 'Ver Bancos',
      path: '/bancos',
      action: 'read',
      auth: true,
      subject: 'ADMIN',
      icon: 'tabler:building-bank',
      avatarColor: 'success'
    },
    {
      title: 'Clientes',
      subtitle: 'Ver Clientes',
      action: 'read',
      auth: true,
      subject: 'ACCOUNTING',
      path: '/clientes',
      icon: 'tabler:users',
      avatarColor: 'primary'
    },
    {
      title: 'Bancos do Cliente',
      subtitle: 'Ver Bancos do Cliente',
      action: 'read',
      auth: true,
      subject: 'ACCOUNTING',
      path: '/bancos/extrato',
      icon: 'tabler:building-bank',
      avatarColor: 'success'
    },
    {
      title: 'Minha Conta',
      path: '/minha-conta',
      action: 'read',
      auth: true,
      subject: ['ADMIN', 'ACCOUNTING'],
      icon: 'tabler:user-check',
      avatarColor: 'info'
    }
  ]
}

export default navigation
