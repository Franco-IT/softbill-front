import { Box } from '@mui/material'
import Card from './components/Card'

const ClosingContent = () => {
  const pending = [
    {
      id: '1',
      avatar: undefined,
      name: 'Banco do Brasil',
      status: 'PENDING'
    },
    {
      id: '2',
      avatar: undefined,
      name: 'Satander',
      status: 'PENDING'
    }
  ]

  const headerProps = {
    avatar: undefined,
    title: 'Limpy IT',
    subtitle: {
      label: 'Fechamento',
      value: '#Agosto'
    }
  }

  const contentProps = {
    pending
  }

  const cardProps = {
    headerProps,
    contentProps
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Card
        {...cardProps}
        sx={{
          width: '80%'
        }}
      />
    </Box>
  )
}

export default ClosingContent
