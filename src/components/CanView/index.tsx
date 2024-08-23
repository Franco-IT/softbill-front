import { ReactNode } from 'react'
import { Actions as ActionsACL } from 'src/configs/acl'
import { useAuth } from 'src/hooks/useAuth'
import { Can } from 'src/layouts/components/acl/Can'

interface CamViewProps {
  children: ReactNode
  actions: ActionsACL
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
