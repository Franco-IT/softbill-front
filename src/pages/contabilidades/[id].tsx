import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import { Grid, LinearProgress } from '@mui/material'

import TabsAccount from 'src/views/pages/contabilidades/Account/tabsAccount'
import Account from 'src/views/pages/contabilidades/Account'

import themeConfig from 'src/configs/themeConfig'

import useGetDataApi from 'src/hooks/useGetDataApi'
import { UserDataProps } from 'src/types/users'

export default function Accounting() {
  const router = useRouter()

  const { id } = router.query

  const {
    data: accounting,
    loading,
    error,
    refresh,
    setRefresh
  } = useGetDataApi<UserDataProps>({ url: `/users/${id}`, callInit: router.isReady })

  useEffect(() => {
    if (!loading) error && router.push('/404')
  }, [error, loading, router])

  if (loading) return <LinearProgress />

  if (accounting) {
    return (
      <>
        <NextSeo
          title={`${themeConfig.templateName} - ${accounting.data.name}`}
          description={`${themeConfig.templateName} - ${accounting.data.name}`}
        />
        <Grid container spacing={6}>
          <Grid item xs={12} xl={4}>
            <Account data={accounting.data} refresh={refresh} setRefresh={setRefresh} />
          </Grid>
          <Grid item xs={12} xl={8}>
            <TabsAccount data={accounting.data} />
          </Grid>
        </Grid>
      </>
    )
  }
}

Accounting.acl = {
  action: 'manage',
  subject: 'ADMIN'
}
