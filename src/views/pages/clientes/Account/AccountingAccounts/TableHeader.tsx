// React and Hooks
import { Fragment, useCallback, useMemo, useState } from 'react'

// Material UI Components
import { CardHeader, Grid, Button, MenuItem } from '@mui/material'

// Internal Custom Components
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import Add from './Add'
import Import from './Import'
import CustomBasicMenu from 'src/components/CustomBasicMenu'

interface TableHeaderProps {
  search: string
  handleSearch: (val: string) => void
  transactionType: string
  handleTransactionType: (val: string) => void
  number: string
  handleNumber: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  const { handleSearch, search, handleTransactionType, transactionType } = props

  const [open, setOpen] = useState(false)
  const [openImportFile, setOpenImportFile] = useState(false)
  const [importType, setImportType] = useState('')

  const hamdleClickImportQuestor = useCallback(() => {
    setImportType('QUESTOR')
    setOpenImportFile(true)
  }, [])

  const handleClickImportDomain = useCallback(() => {
    setImportType('DOMINIO')
    setOpenImportFile(true)
  }, [])

  const menuItems = useMemo(
    () => [
      {
        label: 'Importar Questor',
        icon: <Icon icon='tabler:file-type-csv' fontSize={20} />,
        action: hamdleClickImportQuestor
      },
      {
        label: 'Importar Domínio',
        icon: <Icon icon='tabler:file-type-txt' fontSize={20} />,
        action: handleClickImportDomain
      }
    ],
    [handleClickImportDomain, hamdleClickImportQuestor]
  )

  return (
    <Fragment>
      <Grid container gap={3} paddingX={6} paddingY={4} justifyContent={'end'}>
        <Grid item xs={12}>
          <CardHeader
            sx={{
              padding: 0
            }}
            title='Contas Contábeis'
            action={<CustomBasicMenu buttonLabel='Importar Arquivos' menuItems={menuItems} />}
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={4} alignSelf={`end`}>
            <Grid item xs={12} md={4}>
              <CustomTextField
                fullWidth
                label='Buscar Conta'
                value={search}
                placeholder='Buscar Conta'
                onChange={e => handleSearch(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <CustomTextField
                select
                fullWidth
                label='Tipo'
                placeholder='Selecione'
                value={transactionType || 'default'}
                onChange={e => handleTransactionType(e.target.value)}
              >
                <MenuItem disabled value='default'>
                  <em>selecione</em>
                </MenuItem>
                <MenuItem value=''>Todos</MenuItem>
                <MenuItem value='CREDIT'>Crédito</MenuItem>
                <MenuItem value='DEBIT'>Débito</MenuItem>
              </CustomTextField>
            </Grid>

            <Grid item xs={12} md={4} alignSelf={'flex-end'}>
              <Button fullWidth variant='contained' sx={{ '& svg': { mr: 2 } }} onClick={() => setOpen(true)}>
                <Icon fontSize='1.125rem' icon='tabler:plus' />
                Adicionar C. Contábil
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {open && <Add open={open} handleClose={() => setOpen(false)} />}
      {openImportFile && (
        <Import importType={importType} open={openImportFile} handleClose={() => setOpenImportFile(false)} />
      )}
    </Fragment>
  )
}

export default TableHeader
