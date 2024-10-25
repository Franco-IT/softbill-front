// State and suspense handling
import { Fragment, Suspense, useState } from 'react'

// Navigation
import { useRouter } from 'next/router'

// React Query hooks for mutation and cache management
import { useMutation, useQueryClient } from 'react-query'

// MUI components for layout and UI structure
import { Grid, Card, CardContent, Typography, Divider, CardActions, Button, Box } from '@mui/material'

// Custom components for dialog alerts, chips, image cropping, and badges
import DialogAlert from 'src/@core/components/dialogs/dialog-alert'
import Chip from 'src/@core/components/mui/chip'
import Edit from './Edit'
import ImageCropper from 'src/components/ImageCropper'
import CustomBadge from 'src/components/CustomBadge'
import Icon from 'src/@core/components/icon'

// Theme color types for consistent styling
import { ThemeColor } from 'src/@core/layouts/types'

// DTOs related to user avatar functionality
import { ISetUserAvatarDTO } from 'src/modules/users/dtos/ISetUserAvatarDTO'

// Utilities for data validation, formatting, and introducing delays
import verifyDataValue from 'src/utils/verifyDataValue'
import toast from 'react-hot-toast'
import { delay } from 'src/utils/delay'
import { formatName } from 'src/utils/formatName'
import { applyPhoneMask } from 'src/utils/inputs'
import { formatDate } from 'src/@core/utils/format'
import { renderInitials, renderUser } from 'src/utils/list'

// Controllers for user and client operations
import { userController } from 'src/modules/users'

// Error handling utilities
import { AppError } from 'src/shared/errors/AppError'

// DTOs related to client data
import { IClientDTO } from 'src/modules/clients/dtos/IClientDTO'

// Controllers for client-related operations
import { clientsController } from 'src/modules/clients'

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

  const handleConfirmDeleteClient = async (id: string) => {
    try {
      await clientsController.delete({ id })
      await queryClient.invalidateQueries(['client', data.id])
      await queryClient.invalidateQueries(['clients'])
      toast.success('Cliente deletado com sucesso!')
      delay(2000).then(() => {
        router.push('/clientes')
      })
    } catch (e) {
      e instanceof AppError && toast.error(e.message)
    } finally {
      setDeleteDialogOpen(false)
    }
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
      onSuccess: async () => {
        await queryClient.invalidateQueries(['client', data.id])
        await queryClient.invalidateQueries(['clients'])
      },
      onSettled: () => {
        setOpenImageCropper(false)
      }
    }
  )

  const onSubmit = async (file: File) => {
    const myPromise = handleSetAvatar.mutateAsync(file)

    toast.promise(myPromise, {
      loading: 'Alterando imagem...',
      success: 'Imagem alterada com sucesso!',
      error: (error: AppError) => error.message
    })
  }

  return (
    <Fragment>
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
            <CardContent
              sx={{ padding: { xs: '0 20px 20px !important', xl: '0 40px 20px !important' }, width: '100%' }}
            >
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
          </Card>
        </Grid>
      </Grid>

      {openEdit && <Edit data={data} handleEditClose={handleEditClose} openEdit={openEdit} />}

      {deleteDialogOpen && (
        <DialogAlert
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          question={'Você tem certeza que deseja deletar este cliente?'}
          description={'Essa ação não poderá ser desfeita.'}
          handleConfirmDelete={() => handleConfirmDeleteClient(data.id)}
        />
      )}

      {openImageCropper && (
        <ImageCropper open={openImageCropper} onClose={() => setOpenImageCropper(false)} onSubmit={onSubmit} />
      )}
    </Fragment>
  )
}

export default Account
