import { Button, Card, CardContent, CardHeader, List } from '@mui/material'
import CardPending from './CardPending'
import { useRouter } from 'next/router'

const Pendings = () => {
  const router = useRouter()
  const monthPending = ['february', 'august']

  return (
    <Card>
      <CardHeader
        title='Conciliações Pendentes'
        action={
          <Button variant='contained' color='primary' onClick={() =>router.push('conciliacao-bancaria-cliente')}>
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
          {monthPending.map(sectionId => (
            <li key={`section-${sectionId}`}>
              <ul>
                <CardPending month={sectionId} />
              </ul>
            </li>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default Pendings
