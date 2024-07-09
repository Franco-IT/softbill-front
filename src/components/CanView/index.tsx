import { ReactNode } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { Can } from 'src/layouts/components/acl/Can'

interface CamViewProps {
  children: ReactNode
  actions: string
}

const CanView = ({ children, actions }: CamViewProps) => {
  const { user } = useAuth()

  return (
    <Can I={actions} a={user?.role}>
      {children}
    </Can>
  )
}

export default CanView
