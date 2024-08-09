import { ReactNode, useState } from 'react'
import { Step, StepLabel, Stepper, useMediaQuery } from '@mui/material'
import StepperCustomDot from './StepperCustomDot'
import Icon from 'src/@core/components/icon'
import DrawerAnchor from 'src/components/DrawerAnchor'
import { useDrawer } from 'src/hooks/useDrawer'
import Extract from './DrawerComponents/Extract'
import Conciliation from './DrawerComponents/Conciliation'
import Validation from './DrawerComponents/Validation'

const steps = [
  { name: 'Extrato', icon: <Icon icon='tabler:file-text' fontSize='1.5rem' /> },
  { name: 'Conciliação', icon: <Icon icon='tabler:input-check' fontSize='1.5rem' /> },
  { name: 'Validação', icon: <Icon icon='tabler:eye-check' fontSize='1.5rem' /> }
]

interface CustomStepperInteractiveProps {
  extract: string
  conciliation: string
  exportation: string
}

const CustomStepperInteractive = ({ extract, conciliation, exportation }: CustomStepperInteractiveProps) => {
  const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
  const { anchor, open, toggleDrawer, children } = useDrawer()
  const [activeStep, setActiveStep] = useState(0)

  const drawerProps = {
    anchor,
    open,
    toggleDrawer,
    children
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

        const statusMap: { [key: number]: string } = {
          0: extract,
          1: conciliation,
          2: exportation
        }

        const drawerChildren: any = {
          0: <Extract />,
          1: <Conciliation />,
          2: <Validation />
        }

        if (index === activeStep) {
          const status = statusMap[index]
          if (status === 'ERROR') labelProps.error = true
          if (status === 'APPROVED') (labelProps.completed = true), setActiveStep(index + 1)
        }

        return (
          <Step
            key={index}
            sx={{
              p: '0.5rem 0',
              cursor: 'pointer'
            }}
          >
            <StepLabel
              {...labelProps}
              onClick={e => {
                toggleDrawer(isSmallerThanMd ? 'bottom' : 'right', true, drawerChildren[index])(e)
              }}
              StepIconComponent={labelProps => (
                <StepperCustomDot
                  style={{
                    cursor: 'pointer'
                  }}
                  {...labelProps}
                  icon={step.icon}
                  name={step.name}
                />
              )}
            ></StepLabel>
          </Step>
        )
      })}
      <DrawerAnchor {...drawerProps} />
    </Stepper>
  )
}

export default CustomStepperInteractive
