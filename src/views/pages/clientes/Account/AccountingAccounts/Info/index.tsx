// React
import { Fragment, useState, MouseEvent } from 'react'

// Material UI
import { Card, CardHeader, Divider, CardContent, Grid, Button, MenuItem } from '@mui/material'

// Internal Components
import IconifyIcon from 'src/@core/components/icon'
import DialogAlert from 'src/@core/components/dialogs/dialog-alert'
import CustomTextField from 'src/@core/components/mui/text-field'

// Providers and Services
import { useDrawer } from 'src/hooks/useDrawer'
import { useQueryClient } from 'react-query'
import useToast from 'src/hooks/useToast'

// Types and Layouts
import { IAccountingAccountDTO } from 'src/modules/clients/dtos/IAccountingAccountDTO'
import { clientsController } from 'src/modules/clients'
import { AppError } from 'src/shared/errors/AppError'

// Validation
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { UpdateAccountingAccounts } from './schema'

// Utilities
import { applyAccountNumberMask } from 'src/utils/inputs'

interface InfoProps {
  data: IAccountingAccountDTO
}

const Info = ({ data }: InfoProps) => {
  const queryClient = useQueryClient()
  const { toastError, toastSuccess } = useToast()
  const { toggleDrawer, anchor } = useDrawer()

  const [enableEdit, setEnableEdit] = useState(true)
  const [openDelete, setOpenDelete] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: data,
    mode: 'onBlur',
    resolver: yupResolver(UpdateAccountingAccounts)
  })

  const handleClickEdit = () => setEnableEdit(false)

  const handleClickCancel = () => setEnableEdit(true)

  const handleClickDelete = () => setOpenDelete(true)

  const handleDelete = async () => {
    try {
      await clientsController.deleteAccountingAccount({ clientAccountingAccountId: data.id })
      await queryClient.invalidateQueries(['accounting-accounts-by-client'])
      toastSuccess('Conta deletada com sucesso!')
    } catch (e) {
      e instanceof AppError && toastError(e.message)
    } finally {
      setOpenDelete(false)
    }
  }

  const handleClickClose = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) =>
    toggleDrawer(anchor, false, null)(e)

  const onSubmit = async (data: IAccountingAccountDTO) => {
    try {
      await clientsController.updateAccountingAccount({
        clientAccountingAccountId: data.id,
        body: {
          description: data.description,
          number: data.number,
          transactionType: data.transactionType
        }
      })
      await queryClient.invalidateQueries(['accounting-accounts-by-client'])
      toastSuccess('Conta atualizada com sucesso!')
      setEnableEdit(true)
    } catch (e) {
      e instanceof AppError && toastError(e.message)
    }
  }

  return (
    <Fragment>
      <Card>
        <CardHeader title='Conta Contábil' subheader='Informações da Conta' />
        <Divider />
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Controller
                name='number'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    label='Conta'
                    placeholder='Ex: 2784623-7'
                    value={value}
                    onChange={e => onChange(applyAccountNumberMask(e.target.value))}
                    onBlur={onBlur}
                    error={Boolean(errors.number)}
                    {...(errors.number && { helperText: errors.number.message })}
                    disabled={enableEdit}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='transactionType'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label='Tipo de Transação'
                    value={value || 'default'}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.transactionType)}
                    {...(errors.transactionType && { helperText: errors.transactionType.message })}
                    disabled={enableEdit}
                  >
                    <MenuItem value='default' disabled>
                      Selecione
                    </MenuItem>
                    <MenuItem value='CREDIT'>Crédito</MenuItem>
                    <MenuItem value='DEBIT'>Débito</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='description'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    multiline
                    fullWidth
                    required
                    label='Descrição'
                    placeholder='Digite a descrição da transação'
                    error={Boolean(errors.description)}
                    {...(errors.description && { helperText: errors.description.message })}
                    disabled={enableEdit}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              {!enableEdit ? (
                <Button
                  fullWidth
                  variant='tonal'
                  color='error'
                  startIcon={<IconifyIcon icon='ep:close-bold' fontSize={20} />}
                  onClick={handleClickCancel}
                >
                  Cancelar
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant='tonal'
                  color='error'
                  startIcon={<IconifyIcon icon='tabler:trash' fontSize={20} />}
                  onClick={handleClickDelete}
                >
                  Deletar
                </Button>
              )}
            </Grid>
            <Grid item xs={6}>
              {!enableEdit ? (
                <Button
                  fullWidth
                  variant='contained'
                  startIcon={<IconifyIcon icon='tabler:check' fontSize={20} />}
                  onClick={handleSubmit(onSubmit)}
                >
                  Salvar
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant='contained'
                  startIcon={<IconifyIcon icon='tabler:edit' fontSize={20} />}
                  onClick={handleClickEdit}
                >
                  Editar
                </Button>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant='contained'
                startIcon={<IconifyIcon icon='ep:close-bold' fontSize={20} />}
                onClick={e => handleClickClose(e)}
              >
                Sair
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {openDelete && (
        <DialogAlert
          open={openDelete}
          setOpen={setOpenDelete}
          question={`Deseja realmente deletar esta conta?`}
          description='Essa ação não poderá ser desfeita.'
          handleConfirmDelete={handleDelete}
        />
      )}
    </Fragment>
  )
}

export default Info
