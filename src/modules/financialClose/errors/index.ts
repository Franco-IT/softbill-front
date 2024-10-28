export const errors = {
  400: {
    'File is required': 'Arquivo é obrigatório, tente novamente mais tarde.',
    'This bank account is not integrated': 'Esta conta bancária não está integrada, tente novamente mais tarde.',
    'This monthly financial close bank already has transactions':
      'Este fechamento bancário já possui transações, tente novamente mais tarde.'
  },
  401: {
    'You cannot create monthly financial close for this user':
      'Você não pode criar fechamento financeiro mensal para este usuário, tente novamente mais tarde.',
    'You cannot create the monthly financial close for this user':
      'Você não pode criar o fechamento financeiro mensal para este usuário, tente novamente mais tarde.',
    'You cannot get monthly financial close from this user':
      'Você não pode obter o fechamento financeiro mensal deste usuário, tente novamente mais tarde.',
    'You cannot get the monthly financial close from this user':
      'Você não pode obter o fechamento financeiro mensal deste usuário, tente novamente mais tarde.',
    'You cant get monthly financial close of this bank from another user':
      'Você não pode obter o fechamento financeiro mensal deste banco de outro usuário, tente novamente mais tarde.',
    'You cant get monthly financial close from another accounting':
      'Você não pode obter o fechamento financeiro mensal de outro contador, tente novamente mais tarde.',
    'You cannot create monthly financial close of this bank for this user':
      'Você não pode criar fechamento deste banco para este usuário, tente novamente mais tarde.',
    'You cannot create the monthly financial close of this bank for this user':
      'Você não pode criar o fechamento deste banco para este usuário, tente novamente mais tarde.',
    'You cannot get monthly financial close of this bank from this user':
      'Você não pode obter o fechamento deste banco deste usuário, tente novamente mais tarde.',
    'You cannot get the monthly financial close of this bank from this user':
      'Você não pode obter o fechamento deste banco deste usuário, tente novamente mais tarde.',
    'You cant get monthly financial close of this bank from another accounting':
      'Você não pode obter o fechamento deste banco de outro contador, tente novamente mais tarde.',
    'You cannot get transactions from this user':
      'Você não pode obter transações deste usuário, tente novamente mais tarde.',
    'You cant get an origin from another user':
      'Você não pode obter uma origem de outro usuário, tente novamente mais tarde.',
    'You cant get an origin from another accounting':
      'Você não pode obter uma origem de outro contador, tente novamente mais tarde.'
  },
  404: {
    'Client not found': 'Cliente não encontrado, tente novamente mais tarde.',
    'Accountant Not Found': 'Contador não encontrado, tente novamente mais tarde.',
    'Status has to be in: PENDING,DONE': 'Status tem que ser: PENDING ou DONE, tente novamente mais tarde.',
    'Token User Not Found': 'Token de usuário não encontrado, tente novamente mais tarde.',
    'monthlyFinancialClose Not Found': 'Fechamento não encontrado, tente novamente mais tarde.',
    'Monthly Financial Close not Found': 'Fechamento não encontrado, tente novamente mais tarde.',
    'Bank Account not Found': 'Conta bancária não encontrada, tente novamente mais tarde.',
    'Sub_status has to be in: PENDING,PROCESSED,PROCESSING,TRANSACTION_UNTRACKED,WAITING_VALIDATION,DONE':
      'Sub_status tem que ser: PENDING, PROCESSED, PROCESSING, TRANSACTION_UNTRACKED, WAITING_VALIDATION ou DONE, tente novamente mais tarde.',
    'monthlyFinancialCloseBank Not Found': 'Fechamento bancário não encontrado, tente novamente mais tarde.',
    'Monthly Financial Close Bank Not Found': 'Fechamento bancário não encontrado, tente novamente mais tarde.',
    'File cannot be deleted on a monthly_financial_close_bank DONE':
      'Arquivo não pode ser deletado em um fechamento bancário Aprovado, tente novamente mais tarde.',
    'monthlyFinancialCloseBank doesnt have any imported_file':
      'Fechamento bancário não possui nenhum arquivo importado, tente novamente mais tarde.',
    'transactionAccountOrigin Not Found': 'Conta de origem da transação não encontrada, tente novamente mais tarde.',
    'Transaction Not Found': 'Transação não encontrada, tente novamente mais tarde.'
  },
  409: {
    'User isnt a client': 'Usuário não é um cliente, tente novamente mais tarde.',
    'This date is minor than the min monthly_financial_close date':
      'Esta data é menor que a data mínima de fechamento, tente novamente mais tarde.',
    'Client already has monthly financial close on this month':
      'Cliente já possui fechamento financeiro mensal neste mês, tente novamente mais tarde.',
    'Client doenst have any bank account': 'Cliente não possui nenhuma conta bancária, tente novamente mais tarde.',
    'Invalid Status': 'Status inválido, tente novamente mais tarde.',
    'Please inform accounting_id': 'Por favor, informe o id do contador, tente novamente mais tarde.',
    'Monthly Financial Close isnt validated yet':
      'Fechamento financeiro mensal ainda não foi validado, tente novamente mais tarde.',
    'Reference date cannot be different from monthly financial close reference date':
      'A data de referência não pode ser diferente da data de referência do fechamento, tente novamente mais tarde.',
    'Monthly financial bank cannot be updated while doenst have any transaction':
      'Fechamento bancário não pode ser atualizado enquanto não tiver nenhuma transação, tente novamente mais tarde.',
    'Monthly financial bank cannot be updated while is pending of transactions':
      'Fechamento bancário não pode ser atualizado enquanto estiver pendente de transações, tente novamente mais tarde.',
    'Monthly Financial Close Bank has untracked transactions':
      'Fechamento bancário possui transações não rastreadas, tente novamente mais tarde.',
    'Monthly Financial Close Bank has pending transactions':
      'Fechamento bancário possui transações pendentes, tente novamente mais tarde.',
    'Monthly Financial Close Bank has processing transactions, please wait until all transactions be processed':
      'Fechamento bancário possui transações em processamento, por favor aguarde até que todas as transações sejam processadas, tente novamente mais tarde.',
    'You cant upload to this user': 'Você não pode fazer upload para este usuário, tente novamente mais tarde.',
    'You cant upload to other client': 'Você não pode fazer upload para outro cliente, tente novamente mais tarde.',
    'You cant get a client from another accounting':
      'Você não pode obter um cliente de outro contador, tente novamente mais tarde.',
    'You cant populate to this user': 'Você não pode buscar dados deste usuário, tente novamente mais tarde.',
    'You cant populate to other client': 'Você não pode buscar dados de outro cliente, tente novamente mais tarde.',
    'Invalid status': 'Status inválido, tente novamente mais tarde.',
    'Invalid transaction_type_extract': 'Tipo de transação inválido, tente novamente mais tarde.',
    'Invalid transaction_type_conciliation': 'Tipo de transação inválido, tente novamente mais tarde.',
    'Invalid step': 'Passo inválido, tente novamente mais tarde.',
    'Transaction Origin Already Exists': 'Origem da transação já existe, tente novamente mais tarde.',
    'Error on send file, please send only csv files':
      'Erro ao enviar arquivo, por favor envie apenas arquivos csv, tente novamente mais tarde.'
  },
  500: {
    'Error: This OFX has transactions isnt in the same month of the current monthly financial close ':
      'Este OFX possui transações que não estão no mesmo mês do fechamento financeiro mensal atual, tente novamente mais tarde.',
    'Error: Fail on find client by OFX': 'Falha ao encontrar cliente pelo OFX, tente novamente mais tarde.',
    'Error: Client found isnt equals of client on OFX':
      'Cliente encontrado não é igual ao cliente no OFX, tente novamente mais tarde.',
    'Error: Conciliation not open': 'Conciliação não aberta, tente novamente mais tarde.',
    'Error: Bank already conciliated': 'Banco já conciliado, tente novamente mais tarde.'
  }
}
