import CardOptionHorizontal from 'src/@core/components/card-statistics/card-option-horizontal'

const NoResultsCard = () => (
  <CardOptionHorizontal
    title='Nenhum resultado encontrado'
    subtitle='Tente novamente'
    avatarColor='error'
    icon='tabler:alert-circle'
  />
)

export default NoResultsCard
