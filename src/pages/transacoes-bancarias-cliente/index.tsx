import ReconciliationList from 'src/views/pages/transacoes-bancarias-cliente'

const ClientBankReconciliation = () => {
  return <ReconciliationList />
}

ClientBankReconciliation.acl = {
  action: ['client:read', 'client:update'],
  subject: 'CLIENT'
}

export default ClientBankReconciliation
