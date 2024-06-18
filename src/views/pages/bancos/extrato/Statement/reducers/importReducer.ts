import router from 'next/router'
import toast from 'react-hot-toast'
import { api } from 'src/services/api'

export type StateImportProps = {
  file: File | null
}

export const iniitialStateImport: StateImportProps = {
  file: null
}

export type ActionsImport =
  | {
      type: 'SET_FILE'
      payload: File | null
    }
  | {
      type: 'SEND_FILE'
      payload: File
    }
  | {
      type: 'EXPORT_FILE'
      payload: {
        file: File
        clientId: string
      }
    }

export const reducerImport = (state: StateImportProps, action: ActionsImport): StateImportProps => {
  switch (action.type) {
    case 'SET_FILE':
      return { ...state, file: action.payload }
    case 'SEND_FILE':
      const formData = new FormData()
      formData.append('file', action.payload)

      api
        .post('/bankAccounts/ofx-preview', formData)
        .then(res => console.log(res))
        .catch(() => toast.error('Erro ao gerar preview, tente novamente mais tarde..'))

      return { ...state, file: null }
    case 'EXPORT_FILE':
      const formDataExport = new FormData()
      formDataExport.append('file', action.payload.file)
      formDataExport.append('clientId', action.payload.clientId)

      api
        .post('/bankAccounts/ofx-export', formDataExport)
        .then(res => router.push(res.data))
        .catch(() => toast.error('Erro ao exportar arquivo, tente novamente mais tarde.'))
    default:
      return state
  }
}
