// React Imports
import { useCallback } from 'react'

// External Libraries
import toast from 'react-hot-toast'

const fallbackCopyToClipboard = (text: string) => {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.opacity = '0'
  document.body.appendChild(textArea)
  textArea.select()
  try {
    document.execCommand('copy')
    toast.success('Texto copiado com sucesso!')
  } catch (err) {
    toast.error('Erro ao copiar para a área de transferência.')
  } finally {
    document.body.removeChild(textArea)
  }
}

const useClipboard = () => {
  const copyToClipboard = useCallback(async (text: string, message = 'Texto copiado com sucesso!') => {
    if (!navigator.clipboard) {
      fallbackCopyToClipboard(text)

      return
    }

    try {
      await navigator.clipboard.writeText(text)
      toast.success(message)
    } catch (error) {
      console.error(error)
      toast.error('Erro ao copiar para a área de transferência. Tente novamente.')
    }
  }, [])

  return { copyToClipboard }
}

export default useClipboard
