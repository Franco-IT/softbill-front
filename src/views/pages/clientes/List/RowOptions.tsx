import { memo, useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import useClipBoard from 'src/hooks/useClipboard'

import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import CustomBasicMenu from 'src/components/CustomBasicMenu'
import DialogAlert from 'src/@core/components/dialogs/dialog-alert'

import { userController } from 'src/modules/users'
import { AppError } from 'src/shared/errors/AppError'

const RowOptions = memo(({ id, handleConfirmDelete }: { id: string; handleConfirmDelete: (id: string) => void }) => {
  const router = useRouter()

  const { copyToClipboard } = useClipBoard()

  const [open, setOpen] = useState(false)

  const handleViewProfileClick = useCallback(() => {
    router.push(`/clientes/${id}`)
  }, [id, router])

  const handleDeleteProfileClick = useCallback(() => {
    setOpen(true)
  }, [])

  const handleFirstAccessClick = useCallback(async () => {
    try {
      const response = await userController.firstAccess({ id })

      if (response?.status === 200) {
        copyToClipboard(response.data, 'Link copiado para a área de transferência')
      }
    } catch (error) {
      if (error instanceof AppError) toast.error(error.message)
    }
  }, [copyToClipboard, id])

  const menuItems = useMemo(
    () => [
      {
        label: 'Ver Perfil',
        icon: <Icon icon='tabler:eye' fontSize={20} />,
        action: handleViewProfileClick
      },
      {
        label: 'Primeiro Acesso',
        icon: <Icon icon='tabler:link' fontSize={20} />,
        action: handleFirstAccessClick
      },
      {
        label: 'Deletar',
        icon: <Icon icon='tabler:trash' fontSize={20} />,
        action: handleDeleteProfileClick
      }
    ],
    [handleDeleteProfileClick, handleFirstAccessClick, handleViewProfileClick]
  )

  return (
    <>
      <CustomBasicMenu buttonLabel='Ações' menuItems={menuItems} />

      {open && (
        <DialogAlert
          id={id}
          open={open}
          setOpen={setOpen}
          question={'Você tem certeza que deseja deletar este cliente?'}
          description={'Essa ação não poderá ser desfeita.'}
          handleConfirmDelete={() => handleConfirmDelete(id)}
        />
      )}
    </>
  )
})

export default RowOptions
