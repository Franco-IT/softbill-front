import { memo, ReactNode, useState } from 'react'
import { Step, StepLabel, Stepper } from '@mui/material'
import StepperCustomDot from './StepperCustomDot'
import { StatusProps, SubStatusProps } from '../types'
import steps from '../steps'

interface CustomStepperProps {
  status: StatusProps
}

const CustomStepper = memo(({ status }: CustomStepperProps) => {
  const { extract, conciliation, validation } = status
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

        const statusMap: {
          [key: number]: SubStatusProps
        } = {
          0: extract,
          1: conciliation,
          2: validation
        }

        if (index === activeStep) {
          const status = statusMap[index]
          if (status.isError) labelProps.error = true
          if (status.isPending) labelProps.active = true
          if (status.status) (labelProps.completed = true), setActiveStep(index + 1)
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
})

export default CustomStepper
