import { AnyAction, ThunkDispatch, configureStore } from '@reduxjs/toolkit'
import StatementsReducer from './modules/statement/reducer'
import ClosingReducer from './modules/closing/reducer'

export const store = configureStore({
  reducer: {
    StatementsReducer,
    ClosingReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>
