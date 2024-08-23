import CardClosing from './CardClosing'

const Closing = () => {
  const pending = [
    {
      id: '1',
      avatar: undefined,
      name: 'Inter',
      status: 'PENDING'
    }
  ]

  const headerProps = {
    avatar: undefined,
    title: 'Limpy IT',
    subtitle: {
      label: 'Fechamento',
      value: '#Agosto'
    }
  }

  const contentProps = {
    pending
  }

  const cardProps = {
    headerProps,
    contentProps
  }

  return <CardClosing {...cardProps} />
}

export default Closing
