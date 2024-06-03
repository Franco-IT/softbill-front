import List from 'src/views/pages/usuarios/List'

const Users = () => {
  return <List />
}

Users.acl = {
  action: 'manage',
  subject: 'ADMIN'
}

export default Users
