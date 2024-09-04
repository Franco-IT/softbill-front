import { ReactNode, useState } from 'react'
import { Step, StepLabel, Stepper, useMediaQuery } from '@mui/material'
import StepperCustomDot from './StepperCustomDot'
import DrawerAnchor from 'src/components/DrawerAnchor'
import { useDrawer } from 'src/hooks/useDrawer'
import Extract from './DrawerComponents/Extract'
import Conciliation from './DrawerComponents/Conciliation'
import Validation from './DrawerComponents/Validation'
import { StatusProps, SubStatusProps } from '../types'
import steps from '../steps'

interface CustomStepperInteractiveProps {
  status: StatusProps
  data: any
  generateExtract: () => void
}

const CustomStepperInteractive = ({ status, data }: CustomStepperInteractiveProps) => {
  const { extract, conciliation, validation } = status
  const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
  const { anchor, open, toggleDrawer, children } = useDrawer()
  const [activeStep, setActiveStep] = useState(0)

  const drawerProps = {
    anchor,
    open,
    toggleDrawer,
    children
  }

  const extractProps = {
    status: data.subStatus,
    method: data.bankAccount.generatedBy,
    receivedAt: new Date(data.referenceDate)
  }

  return (
    <Stepper
      activeStep={activeStep}
      orientation='horizontal'
      sx={{
        pl: {
          xs: 0,
          sm: '3rem'
        }
      }}
    >
      {steps.map((step, index) => {
        const labelProps: {
          error?: boolean
          active?: boolean
          completed?: boolean
          icon?: ReactNode
        } = {}

        const statusMap: {
          [key: number]: SubStatusProps
        } = {
          0: extract,
          1: conciliation,
          2: validation
        }

        const drawerChildren: any = {
          0: <Extract {...extractProps} />,
          1: <Conciliation />,
          2: <Validation />
        }

        if (index === activeStep) {
          const status = statusMap[index]
          if (status.isError) labelProps.error = true
          if (status.isPending) labelProps.active = true
          if (status.status) (labelProps.completed = true), setActiveStep(index + 1)
        }

        return (
          <Step key={index} sx={{ p: '0.5rem 0' }}>
            <StepLabel
              {...labelProps}
              style={{ cursor: 'pointer' }}
              onClick={e => {
                toggleDrawer(isSmallerThanMd ? 'bottom' : 'right', true, drawerChildren[index])(e)
              }}
              StepIconComponent={labelProps => <StepperCustomDot {...labelProps} icon={step.icon} name={step.name} />}
            ></StepLabel>
          </Step>
        )
      })}
      <DrawerAnchor {...drawerProps} />
    </Stepper>
  )
}

export default CustomStepperInteractive
