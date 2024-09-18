// React Imports
import { memo } from 'react'

// Material UI Imports
import { Card, Divider } from '@mui/material'

// Custom Components
import Header from './Header'
import Content from './Content'

interface NoClosureCardProps {
  data: any
  referenceDate: string
}

const NoClosureCard = memo(({ data, referenceDate }: NoClosureCardProps) => {
  const headerProps = {
    client: data.client
  }

  const contentProps = {
    clientId: data.client.id,
    referenceDate
  }

  return (
    <Card sx={{ maxHeight: '328px', height: '100%' }}>
      <Header {...headerProps} />
      <Divider />
      <Content {...contentProps} />
    </Card>
  )
})

export default NoClosureCard
