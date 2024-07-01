import { AnyAction, ThunkDispatch, configureStore } from '@reduxjs/toolkit'
import StatementsReducer from './modules/statement/reducer'

export const store = configureStore({
  reducer: {
    StatementsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>
