export interface HeadCellProps {
  disablePadding: boolean
  id: string
  label: string
}

export const HeadCellsBB: HeadCellProps[] = [
  {
    id: 'indicadorTipoLancamento',
    disablePadding: true,
    label: 'Tipo de Lançamento'
  },
  {
    id: 'dataLancamento',
    disablePadding: false,
    label: 'Data de Lançamento'
  },
  {
    id: 'dataMovimento',
    disablePadding: false,
    label: 'Data de Movimento'
  },
  {
    id: 'codigoAgenciaOrigem',
    disablePadding: false,
    label: 'Código da Agência de Origem'
  },
  {
    id: 'numeroLote',
    disablePadding: false,
    label: 'Número do Lote'
  },
  {
    id: 'numeroDocumento',
    disablePadding: false,
    label: 'Número do Documento'
  },
  {
    id: 'codigoHistorico',
    disablePadding: false,
    label: 'Código do Histórico'
  },
  {
    id: 'textoDescricaoHistorico',
    disablePadding: false,
    label: 'Descrição do Histórico'
  },
  {
    id: 'valorLancamento',
    disablePadding: false,
    label: 'Valor do Lançamento'
  },
  {
    id: 'indicadorSinalLancamento',
    disablePadding: false,
    label: 'Indicador de Sinal do Lançamento'
  },
  {
    id: 'textoInformacaoComplementar',
    disablePadding: false,
    label: 'Informação Complementar'
  },
  {
    id: 'numeroCpfCnpjContrapartida',
    disablePadding: false,
    label: 'CPF/CNPJ Contrapartida'
  },
  {
    id: 'indicadorTipoPessoaContrapartida',
    disablePadding: false,
    label: 'Tipo de Pessoa Contrapartida'
  },
  {
    id: 'codigoBancoContrapartida',
    disablePadding: false,
    label: 'Código do Banco Contrapartida'
  },
  {
    id: 'codigoAgenciaContrapartida',
    disablePadding: false,
    label: 'Código da Agência Contrapartida'
  },
  {
    id: 'numeroContaContrapartida',
    disablePadding: false,
    label: 'Número da Conta Contrapartida'
  },
  {
    id: 'textoDvContaContrapartida',
    disablePadding: false,
    label: 'DV da Conta Contrapartida'
  },
  {
    id: 'actions',
    disablePadding: false,
    label: 'Ações'
  }
]
