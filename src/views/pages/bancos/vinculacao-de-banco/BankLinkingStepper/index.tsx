import { useState } from 'react'
import { useRouter } from 'next/router'

import { Box, Step, Grid, Button, Divider, Stepper, StepLabel, Typography } from '@mui/material'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, FormProvider } from 'react-hook-form'

import Client from './steps/Client'
import Summary from './steps/Summary'
import stepsOptions from './steps/stepsOptions'
import { getValidationSchema } from './steps/utils'
import OperationsTypes from './steps/OperationsTypes'
import StepperCustomDot from './steps/StepperCustomDot'
import { baseValidationSchemaByStep, OFXValidationSchema } from './steps/schemas'
import { validationSchemaByBank } from './forms/DynamicFormFields/schemas'
import { defaultValuesByStep, Step1DefaultValues } from './steps/defaultValues'

import toast from 'react-hot-toast'
import StepperWrapper from 'src/@core/styles/mui/stepper'

import { api } from 'src/services/api'

import { ClientProps } from 'src/types/clients'

import { verifyObjectErrorsIsEmpty } from 'src/utils/verifyErrors'

interface BankLinkingStepperProps {
  client: ClientProps
}

const BankLinkingStepper = ({ client }: BankLinkingStepperProps) => {
  const router = useRouter()

  const [activeStep, setActiveStep] = useState<number>(0)
  const [formValues, setFormValues] = useState<Partial<Step1DefaultValues>>()
  const [operationType, setOperationType] = useState<string | null>(null)
  const [bank, setBank] = useState<{ _id: string; name: string }>({
    _id: '',
    name: ''
  })

  const methods = useForm({
    defaultValues:
      defaultValuesByStep[activeStep][(operationType === 'IMPORT' ? 'OFX' : bank.name) as keyof Step1DefaultValues] ||
      defaultValuesByStep[activeStep],
    resolver: yupResolver(
      getValidationSchema(
        activeStep,
        bank.name,
        operationType || '',
        baseValidationSchemaByStep,
        validationSchemaByBank,
        OFXValidationSchema
      )
    )
  })

  const handleResetData = (values: any) => {
    methods.clearErrors()

    const objectKeysValues = Object.keys(values)

    objectKeysValues.map(key => {
      methods.setValue(key, key === 'files' || key === 'importedBank' ? undefined : '')
    })
  }

  const handleSetOperationType = (value: string | null) => {
    const values = methods.getValues()

    handleResetData(values)

    if (value === 'IMPORT') {
      setBank({ _id: '', name: '' })

      const defaultValue = defaultValuesByStep[1]['OFX' as keyof Step1DefaultValues]

      setFormValues(() => {
        return {
          OFX: {
            ...defaultValue,
            clientId: client._id
          }
        }
      })
    }

    setOperationType(value)
  }

  const handleSelectBank = (value: string, banks: any[]) => {
    const values = methods.getValues()

    handleResetData(values)

    const bank = banks.find((bank: any) => bank._id === value)

    setBank(bank)

    setFormValues(() => {
      const bankValues = defaultValuesByStep[1][bank.name as keyof Step1DefaultValues]

      const newValues = Object.assign(bankValues, {
        ...values,
        bankId: bank._id,
        clientId: client._id
      })

      return bank.name && { [bank.name]: newValues }
    })
  }

  const handleNext = (data: any) => {
    if (activeStep === 1) {
      if (!operationType) return toast.error('Selecione o tipo de operação')

      setFormValues(prevValues => {
        if (!prevValues) return prevValues

        if (operationType === 'INTEGRATION') {
          const bankKey = bank.name as keyof Step1DefaultValues

          return {
            [bankKey]: {
              ...(prevValues[bankKey] as any),
              ...data
            }
          }
        }

        return {
          OFX: {
            ...prevValues['OFX'],
            ...data
          }
        }
      })
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    methods.clearErrors()

    if (activeStep - 1 === 0) {
      if (operationType === 'INTEGRATION') setBank({ _id: '', name: '' })

      setOperationType(null)

      methods.reset()
    }

    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleFinalSubmit = (data: any) => {
    const dataKeys = Object.keys(data)

    const formData = new FormData()

    dataKeys.map(key => {
      if (data[key]) {
        if (key === 'files') {
          data[key].map((file: any) => formData.append(key, file))
        } else {
          formData.append(key, data[key])
        }
      }
    })

    api
      .post('/bankAccounts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        if (response.status === 201) {
          toast.success('Banco vinculado com sucesso!')
          router.push(`/clientes/${client._id}`)
        }
      })
      .catch(() => {
        toast.error('Erro ao vincular banco, tente novamente mais tarde')
      })
  }

  const onSubmit = (data: any) => {
    if (activeStep === stepsOptions.length - 1) {
      const key = bank.name || 'OFX'
      handleFinalSubmit(formValues?.[key as keyof Step1DefaultValues])
    } else {
      handleNext(data)
    }
  }

  const banksProps = {
    handleSelectBank,
    bank
  }

  const operationsTypesProps = {
    methods,
    operationType,
    handleSetOperationType,
    banksProps
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <Client client={client} />
      case 1:
        return <OperationsTypes {...operationsTypesProps} />
      case 2:
        return <Summary client={client} payload={formValues?.[(bank.name || 'OFX') as keyof Step1DefaultValues]} />
      default:
        return null
    }
  }

  const renderContent = () => {
    return (
      <FormProvider {...methods}>
        <form key={activeStep} onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} mt={5}>
              <Typography variant='subtitle1' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {stepsOptions[activeStep].title}
              </Typography>
              <Typography variant='subtitle2' component='p'>
                {stepsOptions[activeStep].description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {getStepContent(activeStep)}
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant='tonal' color='secondary' disabled={activeStep === 0} onClick={handleBack}>
                Voltar
              </Button>
              <Button type='submit' variant='contained'>
                {activeStep === stepsOptions.length - 1 ? 'Finalizar' : 'Próximo'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <StepperWrapper>
        <Stepper activeStep={activeStep}>
          {stepsOptions.map((step, index) => {
            const labelProps: {
              error?: boolean
            } = {}
            if (index === activeStep) {
              labelProps.error = false
              if (!verifyObjectErrorsIsEmpty(methods.formState.errors)) {
                labelProps.error = true
              } else {
                labelProps.error = false
              }
            }

            return (
              <Step key={index}>
                <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
                  <div className='step-label'>
                    <Typography className='step-number'>{`0${index + 1}`}</Typography>
                    <div>
                      <Typography className='step-title'>{step.title}</Typography>
                      <Typography className='step-subtitle'>{step.subtitle}</Typography>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </StepperWrapper>

      <Divider sx={{ mt: '24px' }} />

      {renderContent()}
    </Box>
  )
}

export default BankLinkingStepper
