import { Card } from '@mui/material'
import Header from './Header'
import Content from './Content'

interface BankCardProps {
  client: any
}

const BankCard = ({ client }: BankCardProps) => {
  return (
    <Card>
      <Header client={client} />
      <Content banks={client.monthlyFinancialCloseBanks} />
    </Card>
  )
}

export default BankCard
