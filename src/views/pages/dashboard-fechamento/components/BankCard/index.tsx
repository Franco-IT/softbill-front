import { Card } from '@mui/material'
import Header from './Header'
import Content from './Content'

interface BankCardProps {
  user: any
}

const BankCard = ({ user }: BankCardProps) => {
  return (
    <Card>
      <Header user={user} />
      <Content banks={user.banks} />
    </Card>
  )
}

export default BankCard
