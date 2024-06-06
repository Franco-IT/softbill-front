import { CSSProperties } from 'react'

export const styleVideo: CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  top: 0,
  left: 0,
  zIndex: -1,
  opacity: 0.4,
  filter: 'brightness(0.5)'
}
