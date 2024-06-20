import * as React from 'react'
import { styled, Button, Box } from '@mui/material'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

interface InputFileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string
  IconComponent?: React.ElementType
}

export default function InputFileUpload({ text, IconComponent, ...rest }: InputFileUploadProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <Button
        component='label'
        role={undefined}
        variant='contained'
        tabIndex={-1}
        startIcon={IconComponent ? <IconComponent /> : null}
      >
        {text}
        <VisuallyHiddenInput type='file' {...rest} />
      </Button>
    </Box>
  )
}
