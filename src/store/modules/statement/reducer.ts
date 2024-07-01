import router from 'next/router'

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  ClientProps,
  ExportProps,
  ImportProps,
  IntegrationProps,
  OperationTypeProps,
  StateStatementProps
} from './types'

import { api } from 'src/services/api'

const initialState: StateStatementProps = {
  statements: [],
  clientId: null,
  operationType: null,
  operations: {
    integration: {
      bankId: null,
      startDate: null,
      endDate: null
    },
    import: {
      fileOFX: null
    },
    export: {
      model: null
    }
  }
}

const StatementsReducer = createSlice({
  name: 'statements',
  initialState,
  reducers: {
    setClientId(state, action: PayloadAction<ClientProps>) {
      state.clientId = action.payload
    },
    setBankId(state, action: PayloadAction<string | null>) {
      state.operations.integration.bankId = action.payload
    },
    setStartDate(state, action: PayloadAction<string | null>) {
      state.operations.integration.startDate = action.payload
    },
    setEndDate(state, action: PayloadAction<string | null>) {
      state.operations.integration.endDate = action.payload
    },
    setOperationType(state, action: PayloadAction<OperationTypeProps>) {
      state.operationType = action.payload
    },
    setModelExport(state, action: PayloadAction<ExportProps>) {
      state.operations.export.model = action.payload.model
    },
    setFile(state, action: PayloadAction<ImportProps>) {
      state.operations.import.fileOFX = action.payload.fileOFX
    },
    setStatements(state, action: PayloadAction<any[]>) {
      state.statements = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(handleExportFile.fulfilled, (state, action) => {
      // switch (state.operationType) {
      //   case 'INTEGRATION':
      //     state.operations.integration.bankId = null
      //     state.operations.integration.startDate = null
      //     state.operations.integration.endDate = null
      //     break
      //   case 'IMPORT':
      //     state.operations.import.fileOFX = null
      //     break
      //   default:
      //     break

      router.push(action.payload)
    })

    builder.addCase(handleExportFileOFX.fulfilled, (state, action) => {
      // switch (state.operationType) {
      //   case 'INTEGRATION':
      //     state.operations.integration.bankId = null
      //     state.operations.integration.startDate = null
      //     state.operations.integration.endDate = null
      //     break
      //   case 'IMPORT':
      //     state.operations.import.fileOFX = null
      //     break
      //   default:
      //     break
      // }
      router.push(action.payload)
    })
  }
})

export const handleExportFile = createAsyncThunk(
  'statements/handleExportFile',
  async ({ bankId, endDate, startDate }: IntegrationProps) => {
    const response = await api.get(`/bankAccounts/export-bank-data/${bankId}?exportFileType=CSV`, {
      params: { startDate, endDate }
    })

    return response.data
  }
)

export const handleExportFileOFX = createAsyncThunk(
  'statements/handleExportFileOFX',
  async ({ clientId, fileOFX }: { clientId: string; fileOFX: File }) => {
    const formData = new FormData()
    formData.append('file', fileOFX)
    formData.append('clientId', clientId as string)

    const response = await api.post('/bankAccounts/ofx-export', formData)

    return response.data
  }
)

export const {
  setBankId,
  setClientId,
  setEndDate,
  setFile,
  setModelExport,
  setOperationType,
  setStartDate,
  setStatements
} = StatementsReducer.actions

export default StatementsReducer.reducer
