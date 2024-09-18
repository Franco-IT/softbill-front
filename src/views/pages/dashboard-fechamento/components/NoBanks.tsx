// Material UI Imports
import { Box, Button, Typography } from '@mui/material'

interface NoBanksProps {
  onClickButton: () => void
}

const NoBanks = ({ onClickButton }: NoBanksProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'center', alignItems: 'center' }}>
      <Typography variant='body2' color='textSecondary'>
        Este cliente ainda não possui bancos cadastrados
      </Typography>
      <Button variant='contained' onClick={onClickButton}>
        Cadastrar Banco
      </Button>
    </Box>
  )
}

export default NoBanks
