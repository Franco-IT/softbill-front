import ReconciliationList from 'src/views/pages/conciliacao-bancaria-cliente'

const ClientBankReconciliation = () => {
  return <ReconciliationList />
}

ClientBankReconciliation.acl = {
  action: ['client:read', 'client:update'],
  subject: 'CLIENT'
}

export default ClientBankReconciliation
