// React
import { Fragment, useState, MouseEvent } from 'react'

// Material UI
import { Card, CardHeader, Divider, CardContent, Grid, Typography, Box, Avatar, Button } from '@mui/material'

// Componentes Internos
import Edit from '../Edit'
import Chip from 'src/@core/components/mui/chip'
import IconifyIcon from 'src/@core/components/icon'
import CustomInfoField from 'src/components/CustomInfoField'
import DialogAlert from 'src/@core/components/dialogs/dialog-alert'

// Tipos e Layouts
import { ThemeColor } from 'src/@core/layouts/types'
import { IBankAccountDTO } from 'src/modules/banks/dtos/IBankAccountDTO'

// Providers e Serviços
import { dateProvider } from 'src/shared/providers'
import { api } from 'src/services/api'
import toast from 'react-hot-toast'
import { useDrawer } from 'src/hooks/useDrawer'

interface ColorsType {
  [key: string]: ThemeColor
}

const statusColors: ColorsType = {
  ACTIVE: 'success',
  INACTIVE: 'secondary'
}

const statusValues: { [key: string]: string } = {
  ACTIVE: 'Ativo',
  INACTIVE: 'Inativo'
}

interface BankInfoProps {
  data: IBankAccountDTO
}

const BankInfo = ({ data }: BankInfoProps) => {
  const { toggleDrawer, anchor } = useDrawer()

  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleClickEdit = () => setOpenEdit(true)

  const handleClickDelete = () => setOpenDelete(true)

  const handleDelete = () => {
    api
      .delete(`/bankAccounts/${data.id}`)
      .then(() => toast.success('Banco deletado com sucesso!'))
      .catch(() => toast.error('Erro ao deletar banco'))
      .finally(() => setOpenDelete(false))
  }

  const handleClickClose = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) =>
    toggleDrawer(anchor, false, null)(e)

  return (
    <Fragment>
      <Card>
        <CardHeader
          title={data.bank.name}
          subheader='Informações bancárias'
          avatar={
            <Box>
              {data.bank.logo ? (
                <Avatar src={data.bank.logo} alt={data.bank.name} />
              ) : (
                <Avatar
                  sx={{
                    fontSize: 20
                  }}
                >
                  {data.bank.name.charAt(0).toUpperCase()}
                </Avatar>
              )}
            </Box>
          }
        />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h6'>Informações</Typography>
            </Grid>
            <Grid item xs={12}>
              <CustomInfoField label='Conta' value={data.accountNumber} />
            </Grid>
            <Grid item xs={12}>
              <CustomInfoField label='Agência' value={data.agencyNumber} />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Status:</Typography>
                <Chip
                  rounded
                  skin='light'
                  size='small'
                  label={statusValues[data.status]}
                  color={statusColors[String(data.status)]}
                  sx={{
                    textTransform: 'capitalize'
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <CustomInfoField label='Data de Vinculação' value={dateProvider.formatDate(new Date(data.createdAt))} />
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant='tonal'
                color='error'
                startIcon={<IconifyIcon icon='tabler:trash' fontSize={20} />}
                onClick={handleClickDelete}
              >
                Deletar
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant='contained'
                startIcon={<IconifyIcon icon='tabler:edit' fontSize={20} />}
                onClick={handleClickEdit}
              >
                Editar
              </Button>
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

      {openEdit && <Edit data={data} openEdit={openEdit} handleEditClose={() => setOpenEdit(false)} />}

      {openDelete && (
        <DialogAlert
          id={data.id}
          open={openDelete}
          setOpen={setOpenDelete}
          question={`Deseja realmente deletar este banco?`}
          description='Essa ação não poderá ser desfeita.'
          handleConfirmDelete={handleDelete}
        />
      )}
    </Fragment>
  )
}

export default BankInfo
