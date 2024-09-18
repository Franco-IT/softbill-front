// React Imports
import { memo } from 'react'

// Material UI Imports
import { Card, Divider } from '@mui/material'

// Custom Components
import Header from './Header'
import Content from './Content'

interface NoBanksCardProps {
  data: any
}

const NoBanksCard = memo(({ data }: NoBanksCardProps) => {
  const headerProps = {
    client: data.client
  }

  const contentProps = {
    clientId: data.client.id
  }

  return (
    <Card sx={{ maxHeight: '328px', height: '100%' }}>
      <Header {...headerProps} />
      <Divider />
      <Content {...contentProps} />
    </Card>
  )
})

export default NoBanksCard
