import { Card as CardCompoennt, CardProps as CardComponentProps } from '@mui/material'
import Header from './Header'
import Content from './Content'
import Actions from './Actions'

interface CardProps extends CardComponentProps {
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

const Card = ({ headerProps, contentProps, ...rest }: CardProps) => {
  return (
    <CardCompoennt {...rest}>
      <Header {...headerProps} />
      <Content {...contentProps} />
      <Actions />
    </CardCompoennt>
  )
}

export default Card
