import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  monthlyFinancialClose: null,
  showStatements: false,
  showConciliations: false

  // conciliation: {
  //   perPage: 5,
  //   page: 0,
  //   step: 'MONTHLY_FINANCIAL_CLOSE',
  //   bankAccountId: null,
  //   conciliationData: null
  // }
}

const ClosingReducer = createSlice({
  name: 'closing',
  initialState,
  reducers: {
    setMonthlyFinancialClose(state, action) {
      state.monthlyFinancialClose = action.payload
    },
    setShowStatements(state, action) {
      state.showStatements = action.payload
    },
    setShowConciliations(state, action) {
      state.showConciliations = action.payload
    }

    // setStatementPerPage(state, action) {
    //   state.statement.perPage = action.payload
    // },
    // setStatementPage(state, action) {
    //   state.statement.page = action.payload
    // },
    // setStatementStep(state, action) {
    //   state.statement.step = action.payload
    // },
    // setStatementBankAccountId(state, action) {
    //   state.statement.bankAccountId = action.payload
    // },
    // setStatementExtractData(state, action) {
    //   state.statement.extractData = action.payload
    // },
    // setConciliationPerPage(state, action) {
    //   state.conciliation.perPage = action.payload
    // },
    // setConciliationPage(state, action) {
    //   state.conciliation.page = action.payload
    // },
    // setConciliationStep(state, action) {
    //   state.conciliation.step = action.payload
    // },
    // setConciliationBankAccountId(state, action) {
    //   state.conciliation.bankAccountId = action.payload
    // },
    // setConciliationData(state, action) {
    //   state.conciliation.conciliationData = action.payload
    // }
  }
})

export const { setMonthlyFinancialClose, setShowStatements, setShowConciliations } = ClosingReducer.actions

export default ClosingReducer.reducer
