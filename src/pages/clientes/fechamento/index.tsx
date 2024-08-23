import { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import ClosingContent from 'src/views/pages/clientes/fechamento'

const Closing = () => {
  return <ClosingContent />
}

Closing.guestGuard = true

Closing.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Closing
