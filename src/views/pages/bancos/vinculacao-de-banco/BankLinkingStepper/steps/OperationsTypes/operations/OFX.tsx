import { AccordionDetails } from '@mui/material'
import { DynamicFormFields } from '../../../forms/DynamicFormFields'
import { OFXTypeMap } from '../../../forms/DynamicFormFields/typeMap'
import { defaultValuesByStep, Step1DefaultValues } from '../../defaultValues'

const formComponents: { [key: string]: any } = {
  IMPORT: OFXTypeMap
}

interface OFXProps {
  operationType: string | null
}

const OFX = ({ operationType }: OFXProps) => {
  return (
    <AccordionDetails sx={{ py: 4 }}>
      {operationType && formComponents[operationType] ? (
        <DynamicFormFields
          typeMap={formComponents[operationType]}
          fields={Object.keys(defaultValuesByStep[1]['OFX' as keyof Step1DefaultValues])}
        />
      ) : null}
    </AccordionDetails>
  )
}

export default OFX
