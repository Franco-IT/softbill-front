// Bibliotecas externas
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { Grid, LinearProgress } from '@mui/material'
import { useQuery } from 'react-query'

// Configurações
import themeConfig from 'src/configs/themeConfig'

// Componentes e páginas internas
import Account from 'src/views/pages/clientes/Account'
import Tabs from 'src/views/pages/clientes/Account/Tabs'

// Controladores
import { userController } from 'src/modules/users'

// Tipos e errors
import { IAppError } from 'src/shared/errors/AppError'

export default function Client() {
  const router = useRouter()

  const { id } = router.query

  const getClientProps = {
    id: id as string
  }

  const { data: client, isLoading } = useQuery(['client-data', id], () => userController.findByID(getClientProps), {
    onError: (error: IAppError) => {
      router.push(error.statusCode === 404 ? '/404' : '/500')
    },
    enabled: router.isReady,
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true
  })

  if (isLoading) return <LinearProgress />

  if (client) {
    return (
      <>
        <NextSeo
          title={`${themeConfig.templateName} - ${client.data.name}`}
          description={`${themeConfig.templateName} - ${client.data.name}`}
        />
        <Grid container spacing={6}>
          <Grid item xs={12} xl={4}>
            <Account data={client.data} />
          </Grid>
          <Grid item xs={12} xl={8}>
            <Tabs data={client.data} />
          </Grid>
        </Grid>
      </>
    )
  }
}

Client.acl = {
  action: ['read', 'update', 'delete'],
  subject: ['ACCOUNTING', 'ACCOUNTANT']
}
