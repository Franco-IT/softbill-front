import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import { Grid, LinearProgress } from '@mui/material'

import themeConfig from 'src/configs/themeConfig'

import useGetDataApi from 'src/hooks/useGetDataApi'
import { ClientDataProps } from 'src/types/clients'
import Account from 'src/views/pages/clientes/Account'
import Tabs from 'src/views/pages/clientes/Account/Tabs'

export default function Client() {
  const router = useRouter()

  const { id } = router.query

  const {
    data: client,
    loading,
    error,
    refresh,
    setRefresh
  } = useGetDataApi<ClientDataProps>({ url: `/users/${id}`, callInit: router.isReady })

  useEffect(() => {
    if (!loading) error && router.push('/404')
  }, [error, loading, router])

  if (loading) return <LinearProgress />

  if (client) {
    return (
      <>
        <NextSeo
          title={`${themeConfig.templateName} - ${client.data.name}`}
          description={`${themeConfig.templateName} - ${client.data.name}`}
        />
        <Grid container spacing={6}>
          <Grid item xs={12} xl={4}>
            <Account data={client.data} refresh={refresh} setRefresh={setRefresh} />
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
  action: 'update',
  subject: 'ACCOUNTING'
}
