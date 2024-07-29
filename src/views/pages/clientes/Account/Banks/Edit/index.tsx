import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'

import BB from './Forms/BB'

interface EditProps {
  openEdit: boolean
  handleEditClose: () => void
  data: any
}

const Edit = ({ openEdit, handleEditClose, data }: EditProps) => {
  const handleGetForm = (bankSlug: string) => {
    switch (bankSlug) {
      case 'BB':
        return <BB data={data} handleEditClose={handleEditClose} />
      default:
        return null
    }
  }

  return (
    <Dialog open={openEdit} onClose={handleEditClose} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 1000 } }}>
      <DialogTitle
        id='user-view-edit'
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        Editar Conta do Banco
      </DialogTitle>
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <DialogContentText variant='body2' sx={{ textAlign: 'center', mb: 7 }}>
          Edite as informações da conta
        </DialogContentText>
        {handleGetForm(data.bank.slug)}
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      ></DialogActions>
    </Dialog>
  )
}

export default Edit
