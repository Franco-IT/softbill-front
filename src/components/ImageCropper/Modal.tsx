import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

const style = {
  maxWidth: 700,
  width: '100%',
  maxHeight: '80vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto'
}

interface BasicModalProps {
  children: React.ReactNode
  open: boolean
  onClose: () => void
}

export default function BasicModal({ children, open, onClose }: BasicModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      disableScrollLock={false}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box sx={style}>
        <Typography variant='h6' component='h2'>
          Alterar imagem
        </Typography>
        {children}
      </Box>
    </Modal>
  )
}
