// React
import { memo, useCallback } from 'react'

// Next
import { useRouter } from 'next/router'

// MUI
import { CardHeader, Grid, Box, Button } from '@mui/material'

// Components
import Icon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'

interface TableHeaderProps {
  value: string
  handleFilter: (val: string) => void
}

const TableHeader = memo((props: TableHeaderProps) => {
  const router = useRouter()

  const { handleFilter, value } = props

  const handleClickButtonCreateUser = useCallback(() => {
    router.push('/contabilidades/criar-contabilidade')
  }, [router])

  return (
    <Grid container gap={{ xs: 3, md: 0 }} paddingX={6} paddingY={4} justifyContent={'space-between'}>
      <Box display='flex'>
        <CardHeader
          sx={{
            padding: 0
          }}
          title='Contabilidades'
        />
      </Box>

      <Grid item xs={12} md={10}>
        <Grid container gap={3} justifyContent={'end'}>
          <Grid item xs={12} md={3} xl={2}>
            <CustomTextField
              fullWidth
              value={value}
              placeholder='Buscar Contabilidade'
              onChange={e => handleFilter(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={4} xl={3}>
            <Button fullWidth variant='contained' sx={{ '& svg': { mr: 2 } }} onClick={handleClickButtonCreateUser}>
              <Icon fontSize='1.125rem' icon='tabler:plus' />
              Adicionar Contabilidade
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
})

export default TableHeader
