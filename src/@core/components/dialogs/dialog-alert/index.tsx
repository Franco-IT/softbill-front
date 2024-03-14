import { Dispatch, Fragment, SetStateAction } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

interface DialogAlertProps {
  id?: string
  question: string
  description?: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  handleClickAgree?: () => void
}

const DialogAlert = ({ open, setOpen, description, question, handleClickAgree }: DialogAlertProps) => {
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{question}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClickAgree}>Sim</Button>
          <Button onClick={() => setOpen(false)}>Não</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DialogAlert
