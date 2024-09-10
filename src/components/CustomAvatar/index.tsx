import { AvatarProps } from '@mui/material'
import Avatar from 'src/@core/components/mui/avatar'

interface CustomAvatarProps extends AvatarProps {
  src: string | undefined
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | undefined
  content: string
}

const CustomAvatar = ({ content, src, color, ...rest }: CustomAvatarProps) => {
  return (
    <Avatar src={src} color={color} {...rest}>
      {content}
    </Avatar>
  )
}

export default CustomAvatar
