export enum ActionsStatementTypes {
  setClientId = 'SET_CLIENT_ID',
  setBankId = 'SET_BANK_ID',
  setStartDate = 'SET_START_DATE',
  setEndDate = 'SET_END_DATE',
  setOperationType = 'SET_OPERATION_TYPE',
  setModelExport = 'SET_MODEL_EXPORT',
  setFile = 'SET_FILE',
  setStatements = 'SET_STATEMENTS'
}

export type ClientProps = string | null

export type IntegrationProps = {
  bankId: string | null
  startDate: string | null
  endDate: string | null
}

export type ImportProps = {
  fileOFX: string | null
}

export type ExportProps = {
  model: string | null
}

export type OperationTypeProps = 'IMPORT' | 'INTEGRATION' | null

export type StateStatementProps = {
  clientId: ClientProps
  statements: any[]
  operationType: OperationTypeProps
  operations: {
    integration: IntegrationProps
    import: ImportProps
    export: ExportProps
  }
}
