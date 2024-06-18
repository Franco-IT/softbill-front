import router from 'next/router'
import toast from 'react-hot-toast'
import { api } from 'src/services/api'

type DateType = Date | null | undefined

export type StateIntegrationProps = {
  bankId: string | null
  startDate: DateType
  endDate: DateType
}

export const iniitialStateIntegration: StateIntegrationProps = {
  bankId: null,
  startDate: null,
  endDate: null
}

export type ActionsIntegration =
  | {
      type: 'SET_BANK_ID'
      payload: string | null
    }
  | {
      type: 'SET_START_DATE'
      payload: DateType
    }
  | {
      type: 'SET_END_DATE'
      payload: DateType
    }
  | {
      type: 'EXPORT_FILE'
      payload: {
        bankId: string
        startDate: DateType
        endDate: DateType
      }
    }

export const reducerIntegration = (state: StateIntegrationProps, action: ActionsIntegration): StateIntegrationProps => {
  switch (action.type) {
    case 'SET_BANK_ID':
      return { ...state, bankId: action.payload }
    case 'SET_START_DATE':
      return { ...state, startDate: action.payload }
    case 'SET_END_DATE':
      return { ...state, endDate: action.payload }
    case 'EXPORT_FILE':
      const { bankId, startDate, endDate } = action.payload

      api
        .get(`/bankAccounts/export-bank-data/${bankId}?exportFileType=CSV`, { params: { startDate, endDate } })
        .then(res => router.push(res.data))
        .catch(() => toast.error('Erro ao exportar arquivo.'))
    default:
      return state
  }
}
