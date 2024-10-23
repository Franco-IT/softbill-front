// React hooks for managing component state and memoization
import { useCallback, useMemo, useState, memo } from 'react'

// Next.js router for navigation
import { useRouter } from 'next/router'

// Custom hook for clipboard functionality
import useClipBoard from 'src/hooks/useClipboard'

// Toast notifications for user feedback
import toast from 'react-hot-toast'

// Custom icon component for UI
import Icon from 'src/@core/components/icon'

// Custom basic menu component for dropdowns
import CustomBasicMenu from 'src/components/CustomBasicMenu'

// Dialog alert component for displaying messages
import DialogAlert from 'src/@core/components/dialogs/dialog-alert'

// User controller
import { userController } from 'src/modules/users'

// Error handling
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
