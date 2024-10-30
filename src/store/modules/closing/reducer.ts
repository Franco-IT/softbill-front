import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  monthlyFinancialClose: null,
  showStatements: false,
  showConciliations: false,
  showConciliationsByGroup: false
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
    },
    setShowConciliationsByGroup(state, action) {
      state.showConciliationsByGroup = action.payload
    }
  }
})

export const { setMonthlyFinancialClose, setShowStatements, setShowConciliations, setShowConciliationsByGroup } =
  ClosingReducer.actions

export default ClosingReducer.reducer
