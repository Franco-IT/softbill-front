import { useState } from 'react'

import Box from '@mui/material/Box'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'

import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import StepperCustomDot from './StepperCustomDot'

import StepperWrapper from 'src/@core/styles/mui/stepper'
import { ClientProps } from 'src/types/clients'

import steps from './steps'
import BB from './Forms/BB'
import { verifyObjectErrorsIsEmpty } from 'src/utils/verifyErrors'
import Client from './Forms/Client'
import CustomTextField from 'src/@core/components/mui/text-field'
import { MenuItem } from '@mui/material'
import useGetDataApi from 'src/hooks/useGetDataApi'
import { useRouter } from 'next/router'
import Summary from './Forms/Summary'
import { api } from 'src/services/api'

type Step0DefaultValues = Record<string, any>

type BBValues = {
  bankClientId: string | undefined
  bankClientSecret: string | undefined
  accountNumber: string | undefined
  agencyNumber: string | undefined
  bankId: string | undefined
  clientId: string | undefined
  bankName: string | undefined
}

type InterValues = {
  bankClientId: string | undefined
  bankClientSecret: string | undefined
  accountNumber: string | undefined
  agencyNumber: string | undefined
  cnpj: string | undefined
  bankId: string | undefined
  clientId: string | undefined
  bankName: string | undefined
}

type Step1DefaultValues = {
  BB: BBValues
  inter: InterValues
}

type Step2DefaultValues = Record<string, any>

type DefaultValuesByStep = Step0DefaultValues | Step1DefaultValues | Step2DefaultValues

const defaultValuesByStep: DefaultValuesByStep[] = [
  {},
  {
    BB: {
      bankClientId: '',
      bankClientSecret: '',
      accountNumber: '',
      agencyNumber: '',
      bankId: '',
      clientId: '',
      bankName: ''
    },
    INTER: {
      bankClientId: '',
      bankClientSecret: '',
      accountNumber: '',
      agencyNumber: '',
      cnpj: '',
      bankId: '',
      clientId: '',
      bankName: ''
    }
  },
  {}
]

const validationSchemaByBank: { [key: string]: any } = {
  BB: yup.object().shape({
    bankClientId: yup.string().required('ID do Cliente no Banco obrigatório'),
    bankClientSecret: yup.string().required('ID secreto do Cliente no Banco obrigatório'),
    accountNumber: yup.string().required('Número da conta obrigatório'),
    agencyNumber: yup.string().required('Número da agência obrigatório')
  }),
  INTER: yup.object().shape({
    bankClientId: yup.string().required('ID do Cliente no Banco obrigatório'),
    bankClientSecret: yup.string().required('ID secreto do Cliente no Banco obrigatório'),
    accountNumber: yup.string().required('Número da conta obrigatório'),
    agencyNumber: yup.string().required('Número da agência obrigatório'),
    cnpj: yup.string().required('CNPJ obrigatório')
  })
}

const baseValidationSchemaByStep = [
  yup.object(),
  yup.object().shape({
    bankId: yup.string().required('Banco obrigatório')
  }),
  yup.object()
]

const getValidationSchema = (step: number, bankId: string) => {
  if (step === 1 && bankId && validationSchemaByBank[bankId]) return validationSchemaByBank[bankId]

  return baseValidationSchemaByStep[step]
}

interface BankLinkingStepperProps {
  client: ClientProps
}

const BankLinkingStepper = ({ client }: BankLinkingStepperProps) => {
  const router = useRouter()

  const [activeStep, setActiveStep] = useState<number>(0)
  const [bank, setBank] = useState<{ _id: string; name: string }>({
    _id: '',
    name: ''
  })
  const [formValues, setFormValues] = useState<DefaultValuesByStep[]>(defaultValuesByStep)

  const methods = useForm({
    defaultValues:
      defaultValuesByStep[activeStep][bank.name as keyof Step1DefaultValues] || defaultValuesByStep[activeStep],
    resolver: yupResolver(getValidationSchema(activeStep, bank.name))
  })

  const { data: banks } = useGetDataApi<any>({ url: '/banks', callInit: router.isReady })

  const { data: userBanks } = useGetDataApi<any>({
    url: `/bankAccounts/by-client/${router.query.id}`,
    params: { withBanks: true }
  })

  const handleShowForm = (bankName: string) => {
    switch (bankName) {
      case 'BB':
        return <BB />
      default:
        return null
    }
  }

  const handleCheckBanksAvailable = (banks: any[], userBanks: any[]) => {
    if (!banks || !userBanks)
      return (
        <MenuItem value='' disabled>
          Nenhum banco disponível
        </MenuItem>
      )

    const banksAvailable = banks.filter((bank: any) => {
      return !userBanks.find((userBank: any) => userBank.bankId === bank._id)
    })

    if (banksAvailable.length === 0)
      return (
        <MenuItem
          value=''
          disabled
          sx={{
            color: 'white'
          }}
        >
          Nenhum banco disponível
        </MenuItem>
      )

    return banksAvailable.map((bank: any) => (
      <MenuItem key={bank._id} value={bank._id}>
        {bank.name}
      </MenuItem>
    ))
  }

  handleCheckBanksAvailable(banks?.data, userBanks?.data)

  const handleSelectBank = (value: string, banks: any[]) => {
    methods.reset()

    const bank = banks.find((bank: any) => bank._id === value)

    setBank(bank)

    setFormValues(prevValues => {
      const newValues = [...prevValues]
      newValues[activeStep][bank.name as keyof Step1DefaultValues] = {
        ...newValues[activeStep][bank.name as keyof Step1DefaultValues],
        bankId: bank._id,
        bankName: bank.name,
        clientId: client._id
      }

      return newValues
    })
  }

  const handleNext = (data: any) => {
    if (activeStep === 1) {
      setFormValues(prevValues => {
        const newValues = [...prevValues]
        newValues[activeStep][bank.name as keyof Step1DefaultValues] = {
          ...newValues[activeStep][bank.name as keyof Step1DefaultValues],
          ...data
        }

        return newValues
      })
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    methods.clearErrors()
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleFinalSubmit = (data: any) => {
    const formData = new FormData()
    formData.append('clientId', data.clientId)
    formData.append('bankId', data.bankId)
    formData.append('bankClientId', data.bankClientId)
    formData.append('bankClientSecret', data.bankClientSecret)
    formData.append('accountNumber', data.accountNumber)
    formData.append('agencyNumber', data.agencyNumber)

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
    if (activeStep === steps.length - 1) {
      handleFinalSubmit(formValues[activeStep - 1][bank.name as keyof Step1DefaultValues])
    } else {
      handleNext(data)
    }
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <Client client={client} />
      case 1:
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4
            }}
          >
            <CustomTextField
              select
              fullWidth
              label='Banco'
              required
              value={bank._id || 'default'}
              onChange={e => handleSelectBank(e.target.value, banks?.data)}
              error={Boolean(methods.formState.errors?.bankId)}
              {...(methods.formState.errors.bankId && { helperText: methods.formState.errors.bankId.message as any })}
            >
              <MenuItem value='default' disabled>
                Selecione
              </MenuItem>
              {handleCheckBanksAvailable(banks?.data, userBanks?.data)}
            </CustomTextField>
            {handleShowForm(bank.name)}
          </Box>
        )
      case 2:
        return <Summary client={client} payload={formValues[step - 1][bank.name as keyof Step1DefaultValues]} />
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
                {steps[activeStep].title}
              </Typography>
              <Typography variant='subtitle2' component='p'>
                {steps[activeStep].description}
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
                {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
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
          {steps.map((step, index) => {
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
