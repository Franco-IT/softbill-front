export type StateImportProps = {
  file: File | null
  preview: any[]
}

export const iniitialStateImport: StateImportProps = {
  file: null,
  preview: []
}

export type ActionsImport =
  | {
      type: 'SET_FILE'
      payload: File | null
    }
  | {
      type: 'SET_PREVIEW'
      payload: any
    }
  | {
      type: 'GET_PREVIEW'
      payload: any
    }
  | {
      type: 'EXPORT_FILE'
      payload: {
        file: File
        clientId: string
      }
    }

export const reducerImport = (state: StateImportProps, action: ActionsImport) => {
  switch (action.type) {
    case 'SET_FILE':
      if (!action.payload) return { ...state, file: null, preview: [] }

      return { ...state, file: action.payload }
    case 'SET_PREVIEW':
      return { ...state, preview: action.payload }
    case 'GET_PREVIEW':
      return { ...state, preview: action.payload }
    case 'EXPORT_FILE':
      return { ...state, file: action.payload.file }
    default:
      return state
  }
}
