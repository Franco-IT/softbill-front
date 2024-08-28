import { Fragment } from 'react'

import { ListItemButton, ListItemText, ListSubheader, useMediaQuery } from '@mui/material'

import DrawerAnchor from 'src/components/DrawerAnchor'
import Conciliation from './Conciliation'

import { useDrawer } from 'src/hooks/useDrawer'
import useToast from 'src/hooks/useToast'

const CardPending = (props: any) => {
  const { toastPromise } = useToast()
  const { anchor, open, toggleDrawer, children } = useDrawer()
  const isSmallerThanMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

  const drawerProps = {
    anchor,
    open,
    toggleDrawer,
    children
  }

  const month = props.month

  const pendingValue: any = {
    february: [
      {
        id: 'asdnasijdioajdioas',
        bank: 'Banco do Brasil',
        cc: '1234567-8',
        cd: '1234567-8',
        description: 'Transferência PIX',
        value: 'R$ 100,00',
        origin: null,
        type: 'DEBIT',
        createdAt: '2021-10-10T00:00:00.000Z'
      },
      {
        id: 'anfniaosndioansdnas',
        bank: 'Banco do Brasil',
        cc: '1234567-8',
        cd: '1234567-8',
        value: 'R$ 1000,00',
        description: 'Lojas Americanas',
        origin: null,
        type: 'CREDIT',
        createdAt: '2021-10-10T00:00:00.000Z'
      }
    ],
    august: [
      {
        id: 'asdnasijdioajdioas',
        bank: 'Banco do Brasil',
        cc: '1234567-8',
        cd: '1234567-8',
        description: 'Transferência PIX',
        value: 'R$ 100,00',
        origin: null,
        type: 'DEBIT',
        createdAt: '2021-10-10T00:00:00.000Z'
      },
      {
        id: 'anfniaosndioansdnas',
        bank: 'Banco do Brasil',
        cc: '1234567-8',
        cd: '1234567-8',
        value: 'R$ 1000,00',
        description: 'Lojas Americanas',
        origin: null,
        type: 'CREDIT',
        createdAt: '2021-10-10T00:00:00.000Z'
      }
    ]
  }

  const monthsValue: any = {
    january: 'Janeiro',
    february: 'Fevereiro',
    march: 'Março',
    april: 'Abril',
    may: 'Maio',
    june: 'Junho',
    july: 'Julho',
    august: 'Agosto',
    september: 'Setembro',
    october: 'Outubro',
    november: 'Novembro',
    december: 'Dezembro'
  }

  const onSubmit = (e: React.KeyboardEvent | React.MouseEvent) => {
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.5) {
          resolve('foo')

          toggleDrawer(anchor, false, null)(e)
        } else {
          reject('fox')
        }
      }, 1000)
    })

    toastPromise(myPromise, 'Atualizando...', 'Atualizado com sucesso', 'Erro ao atualizar')
  }

  const handleCancel = (e: React.KeyboardEvent | React.MouseEvent) => toggleDrawer(anchor, false, null)(e)

  const conciliationProps = {
    onSubmit,
    handleCancel
  }

  return (
    <Fragment>
      <ListSubheader>{`Pendências ${monthsValue[month]}`}</ListSubheader>
      {pendingValue[month].map((item: any, index: number) => {
        const itemProps = {
          ...item
        }

        return (
          <ListItemButton
            key={`item-${index}-${item}`}
            onClick={e => {
              toggleDrawer(
                isSmallerThanMd ? 'bottom' : 'right',
                true,
                <Conciliation {...conciliationProps} {...itemProps} />
              )(e)
            }}
          >
            <ListItemText primary={`${item.description}: ${item.value}`} />
          </ListItemButton>
        )
      })}
      <DrawerAnchor {...drawerProps} />
    </Fragment>
  )
}

export default CardPending
