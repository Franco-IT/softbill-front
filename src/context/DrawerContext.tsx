// DrawerContext.tsx
import React, { createContext, useState } from 'react'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

type DrawerContextType = {
  anchor: Anchor
  open: boolean
  toggleDrawer: (
    anchor: any,
    open: boolean,
    currentChildren: React.ReactNode
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void
  setDrawerChildren: (children: React.ReactNode) => void
  children: React.ReactNode | null
}

const defaultProvider: DrawerContextType = {
  anchor: 'right',
  open: false,
  toggleDrawer: () => () => null,
  setDrawerChildren: () => null,
  children: null
}

const DrawerContext = createContext<DrawerContextType>(defaultProvider)

type DrawerProviderProps = {
  children: React.ReactNode
}

const DrawerProvider = ({ children }: DrawerProviderProps) => {
  const [state, setState] = useState({
    anchor: 'right' as Anchor,
    open: false,
    children: null as React.ReactNode | null
  })

  const toggleDrawer =
    (anchor: any, open: boolean, currentChildren: React.ReactNode) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        (event.type === 'keydown' && (event as React.KeyboardEvent).key === 'Tab') ||
        (event as React.KeyboardEvent).key === 'Shift'
      ) {
        return
      }
      setState({ ...state, anchor, open, children: currentChildren })
    }

  const setDrawerChildren = (currentChildren: React.ReactNode) => {
    setState(prevState => ({
      ...prevState,
      currentChildren
    }))
  }

  return (
    <DrawerContext.Provider value={{ ...state, toggleDrawer, setDrawerChildren }}>{children}</DrawerContext.Provider>
  )
}

export { DrawerProvider, DrawerContext }
