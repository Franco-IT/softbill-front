import { Badge, BadgeProps, styled } from '@mui/material'

const HoverBadgeWrapper = styled('div')({
  position: 'relative',
  display: 'inline-block',
  '&:hover .MuiBadge-badge': {
    visibility: 'visible',
    opacity: 1
  }
})

const HoverBadge = styled(Badge)({
  cursor: 'pointer',
  '& .MuiBadge-badge': {
    right: 5,
    top: '60%',
    visibility: 'hidden',
    opacity: 0,
    transition: 'visibility 0.2s, opacity 0.2s linear'
  }
})

interface CustomBadgeProps extends BadgeProps {
  children: React.ReactNode
}

const CustomBadge = ({ children, ...rest }: CustomBadgeProps) => {
  return (
    <HoverBadgeWrapper>
      <HoverBadge {...rest}>{children}</HoverBadge>
    </HoverBadgeWrapper>
  )
}

export default CustomBadge
