import List from 'src/views/pages/contabilidades/List'

const Accountings = () => {
  return <List />
}

Accountings.acl = {
  action: 'manage',
  subject: 'ADMIN'
}

export default Accountings
