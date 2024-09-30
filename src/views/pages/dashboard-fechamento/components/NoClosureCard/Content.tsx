// Material UI Imports
import { Box, Button, CardContent, Typography } from '@mui/material'

// Hooks
import { useQueryClient } from 'react-query'
import useToast from 'src/hooks/useToast'

// Providers and Controllers
import { financialCloseController } from 'src/modules/financialClose'
import { dateProvider } from 'src/shared/providers'

interface ContentProps {
  clientId: string
  referenceDate: string
}

const Content = (props: ContentProps) => {
  const { toastPromise } = useToast()
  const queryClient = useQueryClient()

  const handleCreateClosure = (clientId: string, referenceDate: string) => {
    const myPromise = financialCloseController
      .createMonthlyFinancialClose({
        clientId,
        referenceDate
      })
      .then(() => {
        queryClient.invalidateQueries(['financial-closing-list'])
        queryClient.invalidateQueries(['financial-closing-dashboard'])
      })

    toastPromise(myPromise, 'Criando fechamento...', 'Fechamento criado com sucesso!', 'Erro ao criar fechamento!')
  }

  const handleCheckMonth = (referenceDate: string) => {
    const [year, month, day] = referenceDate.split('-')

    return dateProvider.getMonthFromDate(new Date(Number(year), Number(month) - 1, Number(day)))
  }

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
          Este cliente ainda não possui um fechamento para o mês de {handleCheckMonth(props.referenceDate)}
        </Typography>
        <Button variant='contained' onClick={() => handleCreateClosure(props.clientId, props.referenceDate)}>
          Criar Fechamento
        </Button>
      </Box>
    </CardContent>
  )
}

export default Content
