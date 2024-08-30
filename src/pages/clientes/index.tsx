import List from 'src/views/pages/clientes/List'

const Clients = () => {
  return <List />
}

Clients.acl = {
  action: ['read', 'delete'],
  subject: ['ACCOUNTING', 'ACCOUNTANT']
}

export default Clients
