// React
import { useState, MouseEvent } from 'react'

// Material UI
import { useMediaQuery } from '@mui/material'

// Hooks
import { useDrawer } from 'src/hooks/useDrawer'
import useToast from 'src/hooks/useToast'
import { useQueryClient } from 'react-query'

// Services and Notifications
import { bankAccountsController } from 'src/modules/bankAccounts'
import { AppError } from 'src/shared/errors/AppError'

// Internal Components
import Icon from 'src/@core/components/icon'
import DialogAlert from 'src/@core/components/dialogs/dialog-alert'
import CustomBasicMenu from 'src/components/CustomBasicMenu'
import BankInfo from './BankInfo'
import DrawerAnchor from 'src/components/DrawerAnchor'

// Types
import { IBankAccountDTO } from 'src/modules/bankAccounts/dtos/IBankAccountDTO'

// Edit Component
import Edit from './Edit'

interface RowOptionsProps {
  data: IBankAccountDTO
}

const RowOptions = ({ data }: RowOptionsProps) => {
  const queryClient = useQueryClient()
  const { toastSuccess, toastError } = useToast()
  const { anchor, open, toggleDrawer, children } = useDrawer()
  const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const handleClickEdit = () => setOpenEdit(true)

  const handleClickDelete = () => setOpenDelete(true)

  const handleClickInfo = (e: MouseEvent<HTMLDivElement, any>) => {
    toggleDrawer(isSmallerThanMd ? 'bottom' : 'right', true, <BankInfo data={data} />)(e)
  }

  const handleDelete = async () => {
    try {
      await bankAccountsController.deleteBankAccount({ id: data.id })
      await queryClient.invalidateQueries(['client-bank-accounts'])
      toastSuccess('Banco deletado com sucesso!')
    } catch (e) {
      e instanceof AppError && toastError(e.message)
    } finally {
      setOpenDelete(false)
    }
  }

  const menuItems = [
    {
      label: 'Ver Informações',
      icon: <Icon icon='tabler:eye' fontSize={20} />,
      actionWithParam: handleClickInfo
    },
    {
      label: 'Editar',
      icon: <Icon icon='tabler:edit' fontSize={20} />,
      action: handleClickEdit
    },
    {
      label: 'Deletar',
      icon: <Icon icon='tabler:trash' fontSize={20} />,
      action: handleClickDelete
    }
  ]

  const drawerProps = {
    anchor,
    open,
    toggleDrawer,
    children
  }

  return (
    <>
      <CustomBasicMenu buttonLabel='Ações' menuItems={menuItems} />

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

      <DrawerAnchor {...drawerProps} />
    </>
  )
}

export default RowOptions
