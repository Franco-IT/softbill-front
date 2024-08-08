import { useContext } from 'react'
import { DrawerContext } from 'src/context/DrawerContext'

export const useDrawer = () => {
  const context = useContext(DrawerContext)

  if (!context) throw new Error('useDrawer deve ser usado dentro de um DrawerProvider')

  return context
}
