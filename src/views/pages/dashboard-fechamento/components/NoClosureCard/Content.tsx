// Material UI Imports
import { Box, Button, CardContent, Typography } from '@mui/material'
import { useQueryClient } from 'react-query'
import useToast from 'src/hooks/useToast'
import { api } from 'src/services/api'

interface ContentProps {
  clientId: string
  referenceDate: string
}

const Content = (props: ContentProps) => {
  const { toastPromise } = useToast()
  const queryClient = useQueryClient()

  const handleCreateClosure = (clientId: string, referenceDate: string) => {
    const myPromise = api
      .post('monthlyFinancialCloses', {
        clientId,
        referenceDate
      })
      .then(() => {
        queryClient.invalidateQueries(['financial-closing-list'])
        queryClient.invalidateQueries(['financial-closing-dashboard'])
      })

    toastPromise(myPromise, 'Criando fechamento...', 'Fechamento criado com sucesso!', 'Erro ao criar fechamento!')
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
          Este cliente ainda não possui um fechamento para o mês de {props.referenceDate}
        </Typography>
        <Button variant='contained' onClick={() => handleCreateClosure(props.clientId, props.referenceDate)}>
          Criar Fechamento
        </Button>
      </Box>
    </CardContent>
  )
}

export default Content
