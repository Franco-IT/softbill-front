import { SyntheticEvent, useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiTab, { TabProps } from '@mui/material/Tab'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import CircularProgress from '@mui/material/CircularProgress'

import Info from '../Info'

import Icon from 'src/@core/components/icon'

import { ClientProps } from 'src/types/clients'
import Banks from '../Banks'
import { useRouter } from 'next/router'
import AccountingAccounts from '../AccountingAccounts'

interface TabsAccountProps {
  data: ClientProps
}

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1.5)
  }
}))

const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  borderBottom: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
}))

const Tabs = ({ data }: TabsAccountProps) => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>((router.query.tab as string) || 'account')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  useEffect(() => {
    if (data) {
      setIsLoading(false)
    }
  }, [data])

  return (
    <TabContext value={activeTab}>
      <TabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
      >
        <Tab value='account' label='Informações' icon={<Icon fontSize='1.125rem' icon='tabler:user-check' />} />
        <Tab value='banks' label='Bancos' icon={<Icon fontSize='1.125rem' icon='tabler:building-bank' />} />
        <Tab
          value='accountingAccounts'
          label='Contas Contábeis'
          icon={<Icon fontSize='1.125rem' icon='tabler:list' />}
        />
      </TabList>
      <Box sx={{ mt: 4 }}>
        {isLoading ? (
          <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>carregando...</Typography>
          </Box>
        ) : (
          <>
            <TabPanel sx={{ p: 0 }} value='account'>
              <Info data={data} />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='banks'>
              <Banks />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='accountingAccounts'>
              <AccountingAccounts />
            </TabPanel>
          </>
        )}
      </Box>
    </TabContext>
  )
}

export default Tabs
