import { memo, useMemo } from 'react'
import { Avatar, Box, Button, CardContent, Typography, useMediaQuery } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
import GlowIcon from 'src/components/GlowIcon'

export type ColorType = 'primary' | 'error' | 'success' | 'secondary' | 'info' | 'warning' | undefined

export const statusColorsMUI: { [key: string]: ColorType } = {
  ALL: undefined,
  APPROVED: 'success',
  REJECTED: 'error',
  PENDING: 'warning'
}

export const bankStatusLabel: { [key: string]: string } = {
  APPROVED: 'Aprovado',
  PENDING: 'Pendente',
  REJECTED: 'Rejeitado'
}

interface pendingProps {
  id: string
  avatar: string | undefined
  name: string
  status: string
}

interface ContentProps {
  pending: pendingProps[]
}
const Content = ({ pending }: ContentProps) => {
  const isSmallerThan550 = useMediaQuery('(max-width:550px)')

  const formatNameBank = useMemo(
    () => (name: string) => {
      const nameArray = name.split(' ')

      return nameArray[0].length > 15 ? `${nameArray[0].slice(0, 15)}...` : name
    },
    []
  )

  return (
    <CardContent
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <Typography variant='h5' color='text.secondary'>
        Pendências
      </Typography>
      {pending.map((item, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={item.avatar} sx={{ width: '2rem', height: '2rem' }} />
          <Button variant='text' color='inherit' onClick={e => e.stopPropagation()}>
            {formatNameBank(item.name)}
          </Button>
          {isSmallerThan550 ? (
            <GlowIcon status={item.status as 'APPROVED' | 'REJECTED' | 'PENDING'} />
          ) : (
            <CustomChip
              rounded
              skin='light'
              size='small'
              label={bankStatusLabel[item.status]}
              color={statusColorsMUI[item.status]}
              sx={{ textTransform: 'capitalize', minWidth: 85 }}
            />
          )}
        </Box>
      ))}
    </CardContent>
  )
}

export default memo(Content)
