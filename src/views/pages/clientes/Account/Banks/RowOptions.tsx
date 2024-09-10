import { useState } from 'react'

// import { useRouter } from 'next/router'

import Icon from 'src/@core/components/icon'
import DialogAlert from 'src/@core/components/dialogs/dialog-alert'

// import Edit from './Edit'
import CustomBasicMenu from 'src/components/CustomBasicMenu'

import { api } from 'src/services/api'

import toast from 'react-hot-toast'

interface RowOptionsProps {
  data: any
  refreshData: () => void
}

const RowOptions = ({ data, refreshData }: RowOptionsProps) => {
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

  const handleDelete = () => {
    api
      .delete(`/bankAccounts/${data.id}`)
      .then(() => refreshData())
      .catch(() => toast.error('Erro ao deletar banco'))
      .finally(() => setOpenDelete(false))
  }

  const menuItems = [
    // {
    //   label: 'Extrato',
    //   icon: <Icon icon='tabler:building-bank' fontSize={20} />,
    //   action: handleStatement
    // },
    {
      label: 'Deletar',
      icon: <Icon icon='tabler:trash' fontSize={20} />,
      action: handleClickDelete
    }
  ]

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
    </>
  )
}

export default RowOptions
