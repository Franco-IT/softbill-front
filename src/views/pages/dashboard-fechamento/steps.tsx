import Icon from 'src/@core/components/icon'
import { StepProps } from './types'

const steps: StepProps[] = [
  { name: 'Extrato', icon: <Icon icon='tabler:file-text' fontSize='1.5rem' /> },
  { name: 'Conciliação', icon: <Icon icon='tabler:input-check' fontSize='1.5rem' /> },
  { name: 'Validação', icon: <Icon icon='tabler:eye-check' fontSize='1.5rem' /> }
]

export default steps
