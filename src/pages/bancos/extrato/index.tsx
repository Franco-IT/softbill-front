import StatementsTable from 'src/views/pages/bancos/extrato/Statement'

const Statement = () => {
  return <StatementsTable />
}

Statement.acl = {
  action: 'read',
  subject: 'ACCOUNTING'
}

export default Statement
