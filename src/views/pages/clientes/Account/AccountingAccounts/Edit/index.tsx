// Material UI
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box } from '@mui/material'

// React Hook Form
import { FormProvider, useForm } from 'react-hook-form'

// Utilitários de Validação
import { yupResolver } from '@hookform/resolvers/yup'

// Esquemas e Defaults
import { defaultValuesObj } from './Forms/DynamicFormFields/defaultValues'
import { editBankSchema } from './Forms/DynamicFormFields/schemas'

// Formulário Dinâmico e Mapeamentos
import { DynamicFormFields } from './Forms/DynamicFormFields'
import { bbTypeMap, interTypeMap, OFXTypeMap } from './Forms/DynamicFormFields/typeMap'

// Serviços e Notificações
import { api } from 'src/services/api'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'

const formComponents: { [key: string]: any } = {
  '001': bbTypeMap,
  '077': interTypeMap,
  OFX: OFXTypeMap
}

interface EditProps {
  openEdit: boolean
  handleEditClose: () => void
  data: any
}

const Edit = ({ openEdit, handleEditClose, data }: EditProps) => {
  const queryClient = useQueryClient()

  const getValidationSchema = (bankCode: string, generatedBy: string, schemas: { [key: string]: any }) => {
    return schemas[generatedBy === 'API' ? bankCode : 'OFX']
  }

  const methods = useForm({
    defaultValues: {
      ...defaultValuesObj[data.generatedBy === 'API' ? data.bank.code : 'OFX'],
      ...data,
      bankClientId: '',
      bankClientSecret: ''
    },
    resolver: yupResolver(getValidationSchema(data.bank.code, data.generatedBy, editBankSchema))
  })

  const onSubmit = (form: any) => {
    const formData = new FormData()

    const dataKeys = Object.keys(form)

    const schemaKeys = Object.keys(formComponents[form.generatedBy === 'API' ? form.bank.code : 'OFX'])

    for (const key of schemaKeys) {
      if (dataKeys.includes(key)) formData.append(key, form[key])
    }

    api
      .put('/bankAccounts/' + data.id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        if (response.status === 200) {
          toast.success('Dados atualizados com sucesso!')
          queryClient.invalidateQueries(['bank-accounts'])
          handleEditClose()
        }
      })
      .catch(() => {
        toast.error('Erro ao vincular banco, tente novamente mais tarde')
      })
  }

  return (
    <Dialog open={openEdit} onClose={handleEditClose} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 1000 } }}>
      <DialogTitle
        id='user-view-edit'
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        Editar Dados do Banco
      </DialogTitle>
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <DialogContentText variant='body2' sx={{ textAlign: 'center', mb: 7 }}>
          Edite as informações da conta
        </DialogContentText>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <DynamicFormFields
              typeMap={formComponents[data.generatedBy === 'API' ? data.bank.code : 'OFX']}
              fields={Object.keys(defaultValuesObj[data.generatedBy === 'API' ? data.bank.code : 'OFX'])}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                mt: 4
              }}
            >
              <Button variant='tonal' color='error' onClick={handleEditClose} sx={{ minWidth: 107 }}>
                Cancelar
              </Button>
              <Button type='submit' variant='contained' color='primary' sx={{ minWidth: 107 }}>
                Salvar
              </Button>
            </Box>
          </form>
        </FormProvider>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      ></DialogActions>
    </Dialog>
  )
}

export default Edit
