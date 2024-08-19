import toast from 'react-hot-toast'

const useToast = () => {
  const toastSuccess = (message: string) => toast.success(message)

  const toastError = (message: string) => toast.error(message)

  const toastPromise = async (promise: Promise<any>, loading: string, success: string, error: string) =>
    toast.promise(promise, { success, loading, error })

  return { toastSuccess, toastError, toastPromise }
}

export default useToast
