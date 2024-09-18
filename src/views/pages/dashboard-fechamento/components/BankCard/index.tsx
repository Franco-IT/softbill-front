// React Imports
import { memo } from 'react'

// Material UI Imports
import { Card, Divider } from '@mui/material'

// Custom Components
import Header from './Header'
import Content from './Content'

interface BankCardProps {
  client: any
}

const BankCard = memo(({ client }: BankCardProps) => {
  const headerProps = {
    client,
    monthlyFinancialCloseId: client.monthlyFinancialCloseId
  }

  const contentProps = {
    banks: client.monthlyFinancialCloseBanks
  }

  return (
    <Card sx={{ minHeight: '328px' }}>
      <Header {...headerProps} />
      <Divider />
      <Content {...contentProps} />
    </Card>
  )
})

export default BankCard
