import List from 'src/views/pages/bancos/List'

const Banks = () => {
  return <List />
}

Banks.acl = {
  action: 'manage',
  subject: 'ADMIN'
}

export default Banks
