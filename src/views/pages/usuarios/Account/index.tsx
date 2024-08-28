import { Suspense, useState } from 'react'
import { useRouter } from 'next/router'

import { Grid, Card, CardContent, Typography, Divider, CardActions, Button, Box } from '@mui/material'

import Chip from 'src/@core/components/mui/chip'
import DialogAlert from 'src/@core/components/dialogs/dialog-alert'

import Edit from './Edit'

import { UserProps } from 'src/types/users'
import { ThemeColor } from 'src/@core/layouts/types'
import { verifyUserStatus, verifyUserType } from 'src/@core/utils/user'

import { api } from 'src/services/api'

import toast from 'react-hot-toast'

import { delay } from 'src/utils/delay'
import { renderInitials, renderUser } from 'src/utils/list'
import { formatName } from 'src/utils/formatName'
import { applyPhoneMask } from 'src/utils/inputs'
import { formatDate } from 'src/@core/utils/format'
import verifyDataValue from 'src/utils/verifyDataValue'

interface ColorsType {
  [key: string]: ThemeColor
}

const roleColors: ColorsType = {
  ADMIN: 'info'
}

const statusColors: ColorsType = {
  ACTIVE: 'success',
  INACTIVE: 'secondary'
}

interface AccountProps {
  data: UserProps
  refresh: boolean
  setRefresh: (value: boolean) => void
}

const Account = ({ data, refresh, setRefresh }: AccountProps) => {
  const router = useRouter()

  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)

  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  const handleConfirmDeleteProfile = (id: string) => {
    api
      .delete(`/users/${id}`)
      .then(response => {
        if (response.status === 200) {
          toast.success('Usuário deletado com sucesso!')
          delay(2000).then(() => {
            router.push('/usuarios')
          })
        }
      })
      .catch(() => {
        toast.error('Erro ao deletar usuário, tente novamente mais tarde.')
      })
      .finally(() => setDeleteDialogOpen(false))
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent
            sx={{ padding: '40px 40px 20px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}
          >
            <Suspense
              fallback={renderInitials(data, {
                skin: 'light',
                variant: 'rounded',
                sx: {
                  width: 100,
                  height: 100,
                  mb: 4,
                  fontSize: '3rem'
                },
                color: roleColors[data.type] as ThemeColor
              })}
            >
              {renderUser(data, {
                skin: 'light',
                variant: 'rounded',
                sx: {
                  width: 100,
                  height: 100,
                  mb: 4,
                  fontSize: '3rem'
                },
                color: roleColors[data.type] as ThemeColor
              })}
            </Suspense>
            <Typography variant='h4' sx={{ mb: 3 }}>
              {formatName(data.name)}
            </Typography>
            <Chip
              rounded
              skin='light'
              size='medium'
              label={verifyUserType(String(data.type))}
              color={roleColors[data.type]}
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
                  label={verifyUserStatus(String(data.status))}
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
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Telefone:</Typography>
                <Typography sx={{ ml: 3, color: 'text.secondary' }}>
                  {verifyDataValue(applyPhoneMask(data.cellphone))}
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
            question={'Você tem certeza que deseja deletar este usuário?'}
            description={'Essa ação não poderá ser desfeita.'}
            handleConfirmDelete={() => handleConfirmDeleteProfile(data.id)}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Account
