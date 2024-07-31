import StatementsTable from 'src/views/pages/clientes/bancos/Statement'

const Statement = () => {
  return <StatementsTable />
}

Statement.acl = {
  action: 'read',
  subject: 'ACCOUNTING'
}

export default Statement
