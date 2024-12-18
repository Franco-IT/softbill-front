// React hook for managing component state
import { Fragment, Suspense, useState } from 'react'

// Next.js router hook for navigation
import { useRouter } from 'next/router'

// Material UI components for layout and user interface
import { Grid, Card, CardContent, Typography, Divider, CardActions, Button, Box } from '@mui/material'

// Core components
import Chip from 'src/@core/components/mui/chip'
import Icon from 'src/@core/components/icon'
import DialogAlert from 'src/@core/components/dialogs/dialog-alert'

// Components
import Edit from './Edit'
import CustomBadge from 'src/components/CustomBadge'
import ImageCropper from 'src/components/ImageCropper'

// Type definitions for theme colors
import { ThemeColor } from 'src/@core/layouts/types'

// Utils imports
import { formatName } from 'src/utils/formatName'
import { formatDate } from 'src/@core/utils/format'
import { renderInitials, renderUser } from 'src/utils/list'
import { verifyUserStatus, verifyUserType } from 'src/@core/utils/user'

// Utility function for verifying data values
import verifyDataValue from 'src/utils/verifyDataValue'

// Utility function for creating delays
import { delay } from 'src/utils/delay'

// Notification library for displaying messages to the user
import toast from 'react-hot-toast'

// React Query hooks for data fetching and mutation
import { useMutation, useQueryClient } from 'react-query'

// Controller for managing accounting-related operations
import { userController } from 'src/modules/users'
import { accountingsController } from 'src/modules/accounting'

// Custom error class for handling application errors
import { AppError } from 'src/shared/errors/AppError'

// Type definition for accounting data transfer objects
import { IAccountingDTO } from 'src/modules/accounting/dtos/IAccountingDTO'
import { ISetUserAvatarDTO } from 'src/modules/users/dtos/ISetUserAvatarDTO'

interface ColorsType {
  [key: string]: ThemeColor
}

const roleColors: ColorsType = {
  ACCOUNTING: 'warning'
}

const statusColors: ColorsType = {
  ACTIVE: 'success',
  INACTIVE: 'secondary'
}

interface AccountProps {
  data: IAccountingDTO
}

const Account = ({ data }: AccountProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
  const [openImageCropper, setOpenImageCropper] = useState<boolean>(false)

  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  const handleConfirmDeleteProfile = useMutation(
    (id: string) => {
      return accountingsController.delete({ id })
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['accountings'])
        toast.success('Contabilidade deletada com sucesso!')
        delay(2000).then(() => router.push('/contabilidades'))
      },
      onError: error => {
        if (error instanceof AppError) toast.error(error.message)
      }
    }
  )

  const handleSetAvatar = useMutation(
    (file: File) => {
      const formData: ISetUserAvatarDTO = {
        file,
        userId: data.id,
        uploadType: 'LOGO'
      }

      return userController.setAvatar(formData)
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['accounting', data.id])
        await queryClient.invalidateQueries(['accountings'])
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
                  color: roleColors[data.type]
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
                    color: roleColors[data.type]
                  })}
                </CustomBadge>
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
          question={'Você tem certeza que deseja deletar esta contabilidade?'}
          description={'Essa ação não poderá ser desfeita.'}
          handleConfirmDelete={() => handleConfirmDeleteProfile.mutateAsync(data.id)}
        />
      )}

      {openImageCropper && (
        <ImageCropper open={openImageCropper} onClose={() => setOpenImageCropper(false)} onSubmit={onSubmit} />
      )}
    </Fragment>
  )
}

export default Account
