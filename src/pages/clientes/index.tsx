import List from 'src/views/pages/clientes/List'

const Clients = () => {
  return <List />
}

Clients.acl = {
  action: 'read',
  subject: 'ACCOUNTING'
}

export default Clients
