import { useState } from 'react'
import { Grid, Card, CardContent, Typography, Divider, CardActions, Button, Box } from '@mui/material'

import DialogAlert from 'src/@core/components/dialogs/dialog-alert'
import Avatar from 'src/@core/components/mui/avatar'
import Chip from 'src/@core/components/mui/chip'

import Edit from './Edit'

import { getInitials } from 'src/@core/utils/get-initials'

import { ThemeColor } from 'src/@core/layouts/types'
import { ClientProps } from 'src/types/clients'
import verifyDataValue from 'src/utils/verifyDataValue'
import { api } from 'src/services/api'
import toast from 'react-hot-toast'
import { delay } from 'src/utils/delay'
import { useRouter } from 'next/router'
import { formatName } from 'src/utils/formatName'
import { applyPhoneMask } from 'src/utils/inputs'
import { formatDate } from 'src/@core/utils/format'

interface ColorsType {
  [key: string]: ThemeColor
}

const statusColors: ColorsType = {
  ACTIVE: 'success',
  INACTIVE: 'secondary'
}

interface ClientStatusType {
  [key: string]: string
}

const status: ClientStatusType = {
  ACTIVE: 'Ativo',
  INACTIVE: 'Inativo'
}

interface AccountProps {
  data: ClientProps
  refresh: boolean
  setRefresh: (value: boolean) => void
}

const Account = ({ data, refresh, setRefresh }: AccountProps) => {
  const router = useRouter()

  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)

  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  const handleConfirmDeleteClient = (id: string) => {
    api
      .delete(`/users/${id}`)
      .then(response => {
        if (response.status === 200) {
          setDeleteDialogOpen(false)
          toast.success('Cliente deletado com sucesso!')
          delay(2000).then(() => {
            router.push('/clientes')
          })
        }
      })
      .catch(() => {
        setDeleteDialogOpen(false)
      })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent
            sx={{ padding: '40px 40px 20px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}
          >
            <Avatar
              skin='light'
              variant='rounded'
              color={'info'}
              sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }}
            >
              {getInitials(data.name)}
            </Avatar>
            <Typography variant='h4' sx={{ mb: 3 }}>
              {formatName(data.name)}
            </Typography>
            <Chip
              rounded
              skin='light'
              size='small'
              label={'Cliente de Contabilidade'}
              color={'info'}
              sx={{ textTransform: 'capitalize', mb: 4 }}
            />
          </CardContent>
          <Divider sx={{ my: '0 !important', mx: 6 }} />
          <CardContent
            sx={{ padding: { xs: '20px 20px 10px !important', xl: '20px 40px 10px !important' }, width: '100%' }}
          >
            <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
              Detalhes
            </Typography>
            <Box sx={{ pt: 4 }}>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Nome:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{data.name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Data de Cadastro:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{formatDate(new Date(data.createdAt))}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Status:</Typography>
                <Chip
                  rounded
                  skin='light'
                  size='small'
                  label={status[data.status]}
                  color={statusColors[String(data.status)]}
                  sx={{
                    textTransform: 'capitalize'
                  }}
                />
              </Box>
            </Box>
          </CardContent>
          <CardContent sx={{ padding: { xs: '0 20px 20px !important', xl: '0 40px 20px !important' }, width: '100%' }}>
            <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
              Contato
            </Typography>
            <Box sx={{ pt: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>E-mail:</Typography>
                <Typography sx={{ ml: 3, color: 'text.secondary' }}>{verifyDataValue(data.email)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Telefone da Empresa:</Typography>
                <Typography sx={{ ml: 3, color: 'text.secondary' }}>
                  {verifyDataValue(applyPhoneMask(data.additionalData.clientCompanyPhone))}
                </Typography>
              </Box>
            </Box>
          </CardContent>
          <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button color='error' variant='tonal' onClick={() => setDeleteDialogOpen(true)}>
              Deletar
            </Button>
            <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
              Editar
            </Button>
          </CardActions>
          <Edit
            data={data}
            handleEditClose={handleEditClose}
            openEdit={openEdit}
            refresh={refresh}
            setRefresh={setRefresh}
          />
          <DialogAlert
            open={deleteDialogOpen}
            setOpen={setDeleteDialogOpen}
            question={'Você tem certeza que deseja deletar este cliente?'}
            description={'Essa ação não poderá ser desfeita.'}
            handleConfirmDelete={() => handleConfirmDeleteClient(data._id)}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Account
