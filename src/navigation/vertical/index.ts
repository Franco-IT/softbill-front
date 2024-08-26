// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      action: ['read', 'client:read'],
      auth: true,
      subject: ['ADMIN', 'ACCOUNTING', 'COUNTER', 'CLIENT'],
      icon: 'tabler:smart-home'
    },
    {
      title: 'Dashboard Fechamento',
      path: '/dashboard-fechamento',
      auth: true,
      action: 'read',
      subject: ['ACCOUNTING', 'COUNTER'],
      icon: 'tabler:calendar-check'
    },
    {
      title: 'Usuários',
      subtitle: 'Ver Usuários',
      path: '/usuarios',
      action: 'manage',
      auth: true,
      subject: 'ADMIN',
      icon: 'tabler:users',
      avatarColor: 'primary'
    },
    {
      title: 'Contabilidades',
      subtitle: 'Ver Usuários Contabilidade',
      path: '/contabilidades',
      action: 'manage',
      auth: true,
      subject: 'ADMIN',
      icon: 'map:accounting',
      avatarColor: 'warning'
    },
    {
      title: 'Bancos',
      subtitle: 'Ver Bancos',
      path: '/bancos',
      action: 'manage',
      auth: true,
      subject: 'ADMIN',
      icon: 'tabler:building-bank',
      avatarColor: 'success'
    },
    {
      title: 'Contadores',
      subtitle: 'Ver Contadores',
      action: 'read',
      auth: true,
      subject: ['ACCOUNTING', 'COUNTER'],
      path: '/contadores',
      icon: 'tabler:user-dollar',
      avatarColor: 'primary'
    },
    {
      title: 'Clientes',
      subtitle: 'Ver Clientes',
      action: ['read', 'delete'],
      auth: true,
      subject: ['ACCOUNTING', 'COUNTER'],
      path: '/clientes',
      icon: 'tabler:users',
      avatarColor: 'success'
    },
    {
      title: 'Bancos do Cliente',
      subtitle: 'Ver Bancos do Cliente',
      action: 'read',
      auth: true,
      subject: ['ACCOUNTING', 'COUNTER'],
      path: '/bancos/extrato',
      icon: 'tabler:building-bank',
      avatarColor: 'warning'
    },
    {
      title: 'Minha Conta',
      path: '/minha-conta',
      action: ['read', 'update', 'delete'],
      auth: true,
      subject: ['ADMIN', 'ACCOUNTING', 'COUNTER', 'CLIENT'],
      icon: 'tabler:user-check',
      avatarColor: 'info'
    }
  ]
}

export default navigation
