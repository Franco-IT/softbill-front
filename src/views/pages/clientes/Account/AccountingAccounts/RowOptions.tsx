import { useState, MouseEvent, useCallback, useMemo } from 'react'

// Internal Components
import Icon from 'src/@core/components/icon'
import DialogAlert from 'src/@core/components/dialogs/dialog-alert'
import CustomBasicMenu from 'src/components/CustomBasicMenu'
import Info from './Info'
import DrawerAnchor from 'src/components/DrawerAnchor'

// Hooks
import { useDrawer } from 'src/hooks/useDrawer'
import { useMediaQuery } from '@mui/material'

// Services and Notifications
import { clientsController } from 'src/modules/clients'
import { AppError } from 'src/shared/errors/AppError'
import useToast from 'src/hooks/useToast'
import { useQueryClient } from 'react-query'

// Types
import { IAccountingAccountDTO } from 'src/modules/clients/dtos/IAccountingAccountDTO'

interface RowOptionsProps {
  data: IAccountingAccountDTO
}

const RowOptions = ({ data }: RowOptionsProps) => {
  const queryClient = useQueryClient()
  const { toastError, toastSuccess } = useToast()
  const { anchor, open, toggleDrawer, children } = useDrawer()
  const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

  const [openDelete, setOpenDelete] = useState(false)

  const handleClickDelete = () => setOpenDelete(true)

  const handleClickInfo = useCallback(
    (e: MouseEvent<HTMLDivElement, any>) => {
      toggleDrawer(isSmallerThanMd ? 'bottom' : 'right', true, <Info data={data} />)(e)
    },
    [data, isSmallerThanMd, toggleDrawer]
  )

  const handleDelete = async () => {
    try {
      await clientsController.deleteAccountingAccount({ clientAccountingAccountId: data.id })
      await queryClient.invalidateQueries(['accounting-accounts-by-client'])
      toastSuccess('Conta contábil deletada com sucesso!')
    } catch (e) {
      e instanceof AppError && toastError(e.message)
    } finally {
      setOpenDelete(false)
    }
  }

  const menuItems = useMemo(
    () => [
      {
        label: 'Ver Informações',
        icon: <Icon icon='tabler:eye' fontSize={20} />,
        actionWithParam: handleClickInfo
      },
      {
        label: 'Deletar',
        icon: <Icon icon='tabler:trash' fontSize={20} />,
        action: handleClickDelete
      }
    ],
    [handleClickInfo]
  )

  const drawerProps = {
    anchor,
    open,
    toggleDrawer,
    children
  }

  return (
    <>
      <CustomBasicMenu buttonLabel='Ações' menuItems={menuItems} />

      {openDelete && (
        <DialogAlert
          id={data.id}
          open={openDelete}
          setOpen={setOpenDelete}
          question={`Deseja realmente deletar esta conta?`}
          description='Essa ação não poderá ser desfeita.'
          handleConfirmDelete={handleDelete}
        />
      )}

      <DrawerAnchor {...drawerProps} />
    </>
  )
}

export default RowOptions
