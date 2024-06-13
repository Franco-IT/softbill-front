import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const Error = () => {
  const route = useRouter()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        textAlign: 'center',
        height: '100%'
      }}
    >
      <Typography variant='h4'>Ocorreu um erro ao buscar os dados </Typography>
      <Typography variant='body1'>
        Possíveis causas incluem problemas de conectividade, falhas na autenticação ou a API pode estar temporariamente
        indisponível.
      </Typography>
      <Button variant='contained' onClick={() => route.reload()}>
        Tentar Novamente
      </Button>
    </Box>
  )
}

export default Error
