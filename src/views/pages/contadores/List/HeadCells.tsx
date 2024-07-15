export interface HeadCellProps {
  disablePadding: boolean
  id: string
  label: string
}

const HeadCells: HeadCellProps[] = [
  {
    id: 'name',
    disablePadding: true,
    label: 'Nome'
  },
  {
    id: 'email',
    disablePadding: false,
    label: 'E-mail'
  },
  {
    id: 'type',
    disablePadding: false,
    label: 'Perfil'
  },
  {
    id: 'createdAt',
    disablePadding: false,
    label: 'Data de Cadastro'
  },
  {
    id: 'status',
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'actions',
    disablePadding: false,
    label: 'Ações'
  }
]

export default HeadCells
