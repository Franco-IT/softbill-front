import { Avatar, AvatarProps } from '@mui/material'

interface CustomAvatarProps extends AvatarProps {
  src: string | undefined
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | undefined
  content: string
}

const CustomAvatar = ({ content, src, ...rest }: CustomAvatarProps) => {
  return (
    <Avatar src={src} {...rest}>
      {content}
    </Avatar>
  )
}

export default CustomAvatar
