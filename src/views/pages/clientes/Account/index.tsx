// React e hooks
import { Suspense, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'

// MUI
import { Grid, Card, CardContent, Typography, Divider, CardActions, Button, Box } from '@mui/material'

// Componentes internos
import DialogAlert from 'src/@core/components/dialogs/dialog-alert'
import Chip from 'src/@core/components/mui/chip'
import Edit from './Edit'
import ImageCropper from 'src/components/ImageCropper'
import CustomBadge from 'src/components/CustomBadge'
import Icon from 'src/@core/components/icon'

// Tipos e layouts
import { ThemeColor } from 'src/@core/layouts/types'
import { ISetUserAvatarDTO } from 'src/modules/users/dtos/ISetUserAvatarDTO'

// Utilidades
import verifyDataValue from 'src/utils/verifyDataValue'
import { api } from 'src/services/api'
import toast from 'react-hot-toast'
import { delay } from 'src/utils/delay'
import { formatName } from 'src/utils/formatName'
import { applyPhoneMask } from 'src/utils/inputs'
import { formatDate } from 'src/@core/utils/format'
import { renderInitials, renderUser } from 'src/utils/list'

// Controladores e erros
import { userController } from 'src/modules/users'
import { AppError } from 'src/shared/errors/AppError'
import { IClientDTO } from 'src/modules/users/dtos/IClientDTO'

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
  data: IClientDTO
}

const Account = ({ data }: AccountProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
  const [openImageCropper, setOpenImageCropper] = useState<boolean>(false)

  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  const handleConfirmDeleteClient = (id: string) => {
    api
      .delete(`/users/${id}`)
      .then(response => {
        if (response.status === 200) {
          setDeleteDialogOpen(false)
          queryClient.invalidateQueries(['clients'])
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

  const handleSetAvatar = useMutation(
    (file: File) => {
      const formData: ISetUserAvatarDTO = {
        file,
        userId: data.id,
        uploadType: 'PROFILE'
      }

      return userController.setAvatar(formData)
    },
    {
      onSuccess: response => {
        if (response && response.status === 201) {
          queryClient.invalidateQueries(['client-data'])
          toast.success('Imagem alterada com sucesso!')
        }
      },
      onError: error => {
        if (error instanceof AppError) toast.error(error.message)
      },
      onSettled: () => {
        setOpenImageCropper(false)
      }
    }
  )

  const onSubmit = async (file: File) => await handleSetAvatar.mutateAsync(file)

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
                color: 'info'
              })}
            >
              <CustomBadge
                badgeContent={<Icon fontSize='1rem' icon='tabler:edit' />}
                onClick={() => setOpenImageCropper(true)}
                color='secondary'
                variant='standard'
                overlap={'circular'}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
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
                  color: 'info'
                })}
              </CustomBadge>
            </Suspense>
            <ImageCropper open={openImageCropper} onClose={() => setOpenImageCropper(false)} onSubmit={onSubmit} />
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
          <Edit data={data} handleEditClose={handleEditClose} openEdit={openEdit} />
          <DialogAlert
            open={deleteDialogOpen}
            setOpen={setDeleteDialogOpen}
            question={'Você tem certeza que deseja deletar este cliente?'}
            description={'Essa ação não poderá ser desfeita.'}
            handleConfirmDelete={() => handleConfirmDeleteClient(data.id)}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Account
