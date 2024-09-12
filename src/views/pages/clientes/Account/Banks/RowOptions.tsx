import { useState, MouseEvent } from 'react'

// import { useRouter } from 'next/router'

import Icon from 'src/@core/components/icon'
import DialogAlert from 'src/@core/components/dialogs/dialog-alert'

// import Edit from './Edit'
import CustomBasicMenu from 'src/components/CustomBasicMenu'

import { api } from 'src/services/api'

import toast from 'react-hot-toast'
import { useDrawer } from 'src/hooks/useDrawer'
import BankInfo from './BankInfo'
import { IBankAccountDTO } from 'src/modules/banks/dtos/IBankAccountDTO'
import DrawerAnchor from 'src/components/DrawerAnchor'

interface RowOptionsProps {
  data: IBankAccountDTO
}

const RowOptions = ({ data }: RowOptionsProps) => {
  const { anchor, open, toggleDrawer, children } = useDrawer()

  // const router = useRouter()

  // const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  // const handleClickEdit = () => setOpenEdit(true)

  const handleClickDelete = () => setOpenDelete(true)

  // const handleStatement = () =>
  //   router.push({
  //     pathname: '/clientes/banco/extrato/[id]',
  //     query: { id: data.id, slug: data?.bank?.slug || data.importedBank, client: data.clientId }
  //   })

  const handleClickInfo = (e: MouseEvent<HTMLDivElement, any>) => {
    toggleDrawer('right', true, <BankInfo data={data} />)(e)
  }

  const handleDelete = () => {
    api
      .delete(`/bankAccounts/${data.id}`)
      .then(() => console.log('yesye'))
      .catch(() => toast.error('Erro ao deletar banco'))
      .finally(() => setOpenDelete(false))
  }

  const menuItems = [
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

      {/* {openEdit && <Edit data={data} openEdit={openEdit} handleEditClose={() => setOpenEdit(false)} />} */}

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
