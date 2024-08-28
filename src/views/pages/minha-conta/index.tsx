import { memo, Suspense, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'
import { Grid, Card, CardContent, Typography, Divider, CardActions, Button, Box } from '@mui/material'

import toast from 'react-hot-toast'

import DialogAlert from 'src/@core/components/dialogs/dialog-alert'
import Chip from 'src/@core/components/mui/chip'
import CustomBadge from 'src/components/CustomBadge'
import Icon from 'src/@core/components/icon'
import ImageCropper from 'src/components/ImageCropper'

import { useAuth } from 'src/hooks/useAuth'

import { ThemeColor } from 'src/@core/layouts/types'
import { verifyUserStatus, verifyUserType } from 'src/@core/utils/user'
import { formatDate } from 'src/@core/utils/format'

import { delay } from 'src/utils/delay'
import { formatName } from 'src/utils/formatName'
import verifyDataValue from 'src/utils/verifyDataValue'
import { applyPhoneMask } from 'src/utils/inputs'
import { renderInitials, renderUser } from 'src/utils/list'

import { ISetUserAvatarDTO } from 'src/modules/users/dtos/ISetUserAvatarDTO'
import { IUserDTO } from 'src/modules/users/dtos/IUserDTO'

import { userController } from 'src/modules/users'
import { AppError } from 'src/shared/errors/AppError'

import Edit from './Edit'

interface ColorsType {
  [key: string]: ThemeColor
}

const roleColors: ColorsType = {
  ADMIN: 'info',
  CLIENT: 'success',
  ACCOUNTING: 'warning',
  COUNTER: 'primary'
}

const statusColors: ColorsType = {
  ACTIVE: 'success',
  INACTIVE: 'secondary'
}

interface MyAccountProps {
  data: IUserDTO
}

const MyAccount = memo(({ data }: MyAccountProps) => {
  const router = useRouter()
  const { setUser, user } = useAuth()
  const queryClient = useQueryClient()

  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
  const [openImageCropper, setOpenImageCropper] = useState<boolean>(false)

  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  const handleConfirmDeleteProfile = useMutation(
    (id: string) => {
      return userController.delete({ id })
    },
    {
      onSuccess: response => {
        if (response?.status === 200) {
          toast.success('Conta deletada com sucesso!')
          queryClient.invalidateQueries(['profile'])
          delay(2000).then(() => {
            router.reload()
          })
        }
      },
      onError: error => {
        if (error instanceof AppError) toast.error(error.message)
      },
      onSettled: () => {
        setDeleteDialogOpen(false)
      }
    }
  )

  const handleSetAvatar = useMutation(
    (file: File) => {
      const formData: ISetUserAvatarDTO = {
        file,
        userId: data.id,
        uploadType: data.type != 'ACCOUNTING' ? 'PROFILE' : 'LOGO'
      }

      return userController.setAvatar(formData)
    },
    {
      onSuccess: response => {
        if (response) {
          const responseData = response.data

          if (response.status === 201) {
            queryClient.invalidateQueries(['profile'])
            user && setUser({ ...user, avatar: responseData.data.url })
            toast.success('Imagem alterada com sucesso!')
          }
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
                color: roleColors[data.type] as ThemeColor
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
                  color: roleColors[data.type] as ThemeColor
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

          {openEdit && <Edit data={data} handleEditClose={handleEditClose} openEdit={openEdit} />}

          {deleteDialogOpen && (
            <DialogAlert
              open={deleteDialogOpen}
              setOpen={setDeleteDialogOpen}
              question={'Você tem certeza que deseja deletar sua conta?'}
              description={'Essa ação não poderá ser desfeita.'}
              handleConfirmDelete={() => handleConfirmDeleteProfile.mutateAsync(data.id)}
            />
          )}
        </Card>
      </Grid>
    </Grid>
  )
})

export default MyAccount
