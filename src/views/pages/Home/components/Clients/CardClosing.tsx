import { Card, CardProps } from '@mui/material'

import ClosingContent from './ClosingContent'
import Actions from './Actions'

interface CardClosingProps extends CardProps {
  headerProps: {
    avatar: string | undefined
    title: string
    subtitle: {
      label: string
      value: string
    }
  }
  contentProps: {
    pending: {
      id: string
      avatar: string | undefined
      name: string
      status: string
    }[]
  }
}

const CardClosing = ({ contentProps, ...rest }: CardClosingProps) => {
  return (
    <Card {...rest}>
      <ClosingContent {...contentProps} />
      <Actions />
    </Card>
  )
}

export default CardClosing
