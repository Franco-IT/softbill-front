// React and Next.js Imports
import React, { useEffect } from 'react'

// Hooks
import { useAppDispatch } from 'src/hooks/useAppDispatch'

// Redux Actions
import {
  setMonthlyFinancialClose,
  setShowConciliations,
  setShowConciliationsByGroup,
  setShowStatements
} from 'src/store/modules/closing/reducer'

import ClosureContent from './ClosureContent'

const Closure = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(setShowStatements(false))
      dispatch(setShowConciliations(false))
      dispatch(setShowConciliationsByGroup(false))
      dispatch(setMonthlyFinancialClose(null))
    }
  }, [dispatch])

  return <ClosureContent />
}

export default Closure
