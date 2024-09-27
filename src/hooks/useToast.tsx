import toast from 'react-hot-toast'
import { AppError } from 'src/shared/errors/AppError'

const useToast = () => {
  const toastSuccess = (message: string) => toast.success(message)

  const toastError = (message: string) => toast.error(message)

  const toastPromise = (promise: Promise<any>, loading: string, success: string, error?: string) =>
    toast.promise(promise, { success, loading, error: err => (err instanceof AppError ? err.message : error || err) })

  return { toastSuccess, toastError, toastPromise }
}

export default useToast
