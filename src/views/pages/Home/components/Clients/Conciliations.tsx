import { Button, Card, CardContent, CardHeader, List, ListItemButton, ListItemText } from '@mui/material'
import CardPending from './CardPending'
import { useRouter } from 'next/router'

interface ConciliationsProps {
  data: any
}

const Conciliations = ({ data }: ConciliationsProps) => {
  const router = useRouter()

  return (
    <Card>
      <CardHeader
        title='Conciliações Pendentes'
        action={
          <Button variant='contained' color='primary' onClick={() => router.push('conciliacao-bancaria-cliente')}>
            Ver Todos
          </Button>
        }
      />
      <CardContent>
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 300,
            '& ul': { padding: 0 },
            '&::-webkit-scrollbar': {
              width: '0.2em'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme => theme.palette.grey[300],
              borderRadius: 10
            }
          }}
          subheader={<li />}
        >
          {data.length > 0 ? (
            data.map((item: any) => (
              <li key={`section-${item.bankAccountId}`}>
                <ul>
                  <CardPending data={item} />
                </ul>
              </li>
            ))
          ) : (
            <li>
              <ul>
                <ListItemButton>
                  <ListItemText primary={`Nenhuma conciliação pendente`} />
                </ListItemButton>
              </ul>
            </li>
          )}
        </List>
      </CardContent>
    </Card>
  )
}

export default Conciliations
