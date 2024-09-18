// React Imports
import { memo } from 'react'

// Material UI Imports
import { Card, Divider } from '@mui/material'

// Custom Components
import Header from './Header'
import Content from './Content'

interface BankCardProps {
  client: any
  referenceDate: string
}

const BankCard = memo(({ client, referenceDate }: BankCardProps) => {
  const headerProps = {
    client: client.monthlyFinancialClose,
    monthlyFinancialCloseId: client.monthlyFinancialClose.monthlyFinancialCloseId
  }

  const contentProps = {
    data: client,
    referenceDate
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
