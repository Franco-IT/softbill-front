// ** MUI Imports
import { StepIconProps } from '@mui/material/StepIcon'
import CustomAvatar from 'src/@core/components/mui/avatar'

import { statusColorsMUI } from '../utils'
import { Tooltip } from '@mui/material'

interface StepperCustomDot extends StepIconProps {
  name: string
}

const StepperCustomDot = (props: StepperCustomDot) => {
  const { completed, error, icon, active } = props

  const statusValue = (error && 'REJECTED') || (completed && 'APPROVED') || (active && 'PENDING') || 'PENDING'

  return (
    <Tooltip title={props.name} placement='top'>
      <CustomAvatar skin='light' color={statusColorsMUI[statusValue] || 'warning'} sx={{ width: 38, height: 38 }}>
        {icon}
      </CustomAvatar>
    </Tooltip>
  )
}

export default StepperCustomDot
