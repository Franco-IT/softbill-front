// Material UI Imports
import { Box, Button, CardContent, Typography } from '@mui/material'

interface ContentProps {
  clientId: string
}

const Content = ({ clientId }: ContentProps) => {
  const handleClickAddBanks = (clientId: string) => window.open(`/bancos/vinculacao-de-banco/${clientId}`, '_blank')

  return (
    <CardContent
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '240px',
        '&::-webkit-scrollbar': {
          width: '0.2em'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme => theme.palette.grey[300],
          borderRadius: 10
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 2
        }}
      >
        <Typography variant='h5' color='textSecondary'>
          Este cliente ainda não possui bancos cadastrados
        </Typography>
        <Button variant='contained' onClick={() => handleClickAddBanks(clientId)}>
          Cadastrar Banco
        </Button>
      </Box>
    </CardContent>
  )
}

export default Content
