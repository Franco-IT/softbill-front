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
