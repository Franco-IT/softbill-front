import { Fragment } from 'react'

import { ListItemButton, ListItemText, useMediaQuery } from '@mui/material'

import DrawerAnchor from 'src/components/DrawerAnchor'

import { useDrawer } from 'src/hooks/useDrawer'
import { formatAmount } from 'src/utils/format'
import Chip from 'src/@core/components/mui/chip'
import ConciliationItem from 'src/components/DrawerComponents/ConciliationItem'

const CardPending = (props: any) => {
  const { anchor, open, toggleDrawer, children } = useDrawer()
  const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

  const drawerProps = {
    anchor,
    open,
    toggleDrawer,
    children
  }

  const { data } = props

  return (
    <Fragment>
      {data?.transactions?.map((item: any, index: number) => {
        const itemProps = {
          ...item
        }

        return (
          <ListItemButton
            key={`item-${index}-${item}`}
            onClick={e => {
              toggleDrawer(isSmallerThanMd ? 'bottom' : 'right', true, <ConciliationItem {...itemProps} />)(e)
            }}
          >
            <ListItemText
              primary={`${item.extractDescription}`}
              secondary={
                <Chip
                  rounded
                  size='small'
                  sx={{ mt: 0.5 }}
                  label={formatAmount(item.amount)}
                  color={item.transactionTypeConciliation === 'CREDIT' ? 'success' : 'error'}
                />
              }
            />
          </ListItemButton>
        )
      })}
      <DrawerAnchor {...drawerProps} />
    </Fragment>
  )
}

export default CardPending
