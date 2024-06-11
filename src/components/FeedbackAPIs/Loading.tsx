import { Box, CircularProgress, Typography } from '@mui/material'

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        height: '100%'
      }}
    >
      <CircularProgress size={50} />
      <Typography variant='h4'>Carregando...</Typography>
    </Box>
  )
}

export default Loading
