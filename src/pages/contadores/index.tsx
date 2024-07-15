import List from 'src/views/pages/contadores/List'

const Counters = () => {
  return <List />
}

Counters.acl = {
  action: ['read', 'delete'],
  subject: 'ACCOUNTING'
}

export default Counters
