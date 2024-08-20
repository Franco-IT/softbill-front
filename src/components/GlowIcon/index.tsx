import { useTheme } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { motion, MotionProps } from 'framer-motion'

interface GlowIconProps {
  status: 'APPROVED' | 'PENDING' | 'REJECTED'
}

const GlowIcon = ({ status }: GlowIconProps) => {
  const theme = useTheme()

  const statusColors: { [key in GlowIconProps['status']]: string } = {
    APPROVED: theme.palette.success.main,
    PENDING: theme.palette.warning.main,
    REJECTED: theme.palette.error.main
  }

  const animationProps: MotionProps = {
    animate: {
      boxShadow: [
        `0 0 2px 1px ${statusColors[status]}`,
        `0 0 2.5px 1px ${statusColors[status]}`,
        `0 0 3px 1px ${statusColors[status]}`
      ]
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut'
    }
  }

  return (
    <motion.div
      style={{
        display: 'flex',
        borderRadius: '50%',
        border: 'none'
      }}
      {...animationProps}
    >
      <Icon icon='tabler:circle-filled' color={statusColors[status]} fontSize='1rem' />
    </motion.div>
  )
}

export default GlowIcon
