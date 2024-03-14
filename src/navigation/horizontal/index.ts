// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      action: 'read',
      auth: true,
      subject: 'all',
      icon: 'tabler:smart-home'
    }
  ]
}

export default navigation
