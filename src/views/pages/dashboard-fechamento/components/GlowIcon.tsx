import { useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

interface GlowIconProps {
  status: string
}

const GlowIcon = ({ status }: GlowIconProps) => {
  const theme = useTheme()

  const statusColors: { [key: string]: string } = {
    APPROVED: theme.palette.success.main,
    PENDING: theme.palette.warning.main,
    ERROR: theme.palette.error.main
  }

  return (
    <motion.div
      style={{
        display: 'flex',
        borderRadius: '50%',
        border: 'none'
      }}
      animate={{
        boxShadow: [
          `0 0 2px 1px ${statusColors[status]}`,
          `0 0 2.5px 1px ${statusColors[status]}`,
          `0 0 3px 1px ${statusColors[status]}`
        ]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut'
      }}
    >
      <Icon icon='tabler:circle-filled' color={statusColors[status]} fontSize='1rem' />
    </motion.div>
  )
}

export default GlowIcon
