import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

interface CustomDialogProps {
  open: boolean
  title: string
  children: React.ReactNode
  action: () => void
  actionLabel: string
  closeLabel?: string
  closeAction?: () => void
}

export default function CustomDialog({
  action,
  children,
  title,
  actionLabel,
  closeLabel,
  open,
  closeAction
}: CustomDialogProps) {
  return (
    <Dialog open={open} onClose={closeAction}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={closeAction}>{closeLabel || 'Cancelar'}</Button>
        <Button onClick={action}>{actionLabel}</Button>
      </DialogActions>
    </Dialog>
  )
}
