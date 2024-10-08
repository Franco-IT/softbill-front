// React e hooks
import { SyntheticEvent, useState, useEffect } from 'react'

// MUI
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'

// Componentes internos
import InfoAccount from '../Info'
import ChangePassword from '../changePassword'
import ClientInfo from '../Info/ClientInfo'

// Outros componentes
import Icon from 'src/@core/components/icon'

// Tipos
import { IUserDTO } from 'src/modules/users/dtos/IUserDTO'
import { IClientDTO } from 'src/modules/users/dtos/IClientDTO'

// ** Styled Tab component
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

interface TabsProps {
  data: IUserDTO | IClientDTO
}

const Tabs = ({ data }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>('account')
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
        <Tab value='security' label='Segurança' icon={<Icon fontSize='1.125rem' icon='tabler:lock' />} />
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
              {data.type !== 'CLIENT' ? <InfoAccount data={data} /> : <ClientInfo data={data as IClientDTO} />}
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='security'>
              <ChangePassword />
            </TabPanel>
          </>
        )}
      </Box>
    </TabContext>
  )
}

export default Tabs
