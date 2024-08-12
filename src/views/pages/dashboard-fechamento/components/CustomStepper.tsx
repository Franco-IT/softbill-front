import { ReactNode, useState } from 'react'
import { Step, StepLabel, Stepper } from '@mui/material'
import StepperCustomDot from './StepperCustomDot'
import Icon from 'src/@core/components/icon'

const steps = [
  { name: 'Extrato', icon: <Icon icon='tabler:file-text' fontSize='1.5rem' /> },
  { name: 'Conciliação', icon: <Icon icon='tabler:input-check' fontSize='1.5rem' /> },
  { name: 'Validação', icon: <Icon icon='tabler:eye-check' fontSize='1.5rem' /> }
]

interface CustomStepperProps {
  extract: string
  conciliation: string
  exportation: string
}

const CustomStepper = ({ extract, conciliation, exportation }: CustomStepperProps) => {
  const [activeStep, setActiveStep] = useState(0)

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

        if (index === activeStep) {
          const status = statusMap[index]
          if (status === 'REJECTED') labelProps.error = true
          if (status === 'APPROVED') (labelProps.completed = true), setActiveStep(index+1)
        }

        return (
          <Step
            key={index}
            sx={{
              p: '0.5rem 0'
            }}
          >
            <StepLabel
              {...labelProps}
              StepIconComponent={labelProps => <StepperCustomDot {...labelProps} icon={step.icon} name={step.name} />}
            ></StepLabel>
          </Step>
        )
      })}
    </Stepper>
  )
}

export default CustomStepper
