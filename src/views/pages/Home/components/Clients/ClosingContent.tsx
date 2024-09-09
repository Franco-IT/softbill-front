import { useMemo } from "react"

import { Avatar, Box, Button, CardContent, Typography, useMediaQuery } from "@mui/material"

import Chip from "src/@core/components/mui/chip"
import GlowIcon from "src/components/GlowIcon"

interface pendingProps {
  id: string
  avatar: string | undefined
  name: string
  status: string
}

interface ContentProps {
  pending: pendingProps[]
}

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

const ClosingContent = ({ pending }: ContentProps) => {
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
            <GlowIcon status={item.status as 'DONE' | 'REJECTED' | 'PENDING'} />
          ) : (
            <Chip
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


export default ClosingContent