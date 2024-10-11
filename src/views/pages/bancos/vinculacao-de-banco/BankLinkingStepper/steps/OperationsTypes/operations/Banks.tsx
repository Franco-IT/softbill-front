import { AccordionDetails, Box, MenuItem } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'
import { DynamicFormFields } from '../../../forms/DynamicFormFields'
import { handleCheckBanksAvailable } from '../../utils'
import useGetDataApi from 'src/hooks/useGetDataApi'
import { useRouter } from 'next/router'
import { bbTypeMap, interTypeMap } from '../../../forms/DynamicFormFields/typeMap'
import { defaultValuesByStep, Step1DefaultValues } from '../../defaultValues'
import { UseFormReturn } from 'react-hook-form'

const formComponents: { [key: string]: any } = {
  '001': bbTypeMap,
  '077': interTypeMap
}

interface BanksProps {
  methods: UseFormReturn<any, any>
  bank: { id: string; code: string }
  handleSelectBank: (bankId: string, banks: any) => void
}

const Banks = ({ handleSelectBank, methods, bank }: BanksProps) => {
  const router = useRouter()

  const { data: banks } = useGetDataApi<any>({
    url: '/banks',
    params: {
      perPage: 1000,
      integrated: true
    },
    callInit: router.isReady
  })

  const { data: userBanks } = useGetDataApi<any>({
    url: `/bankAccounts/by-client/${router.query.id}`,
    params: { withBanks: true },
    callInit: router.isReady
  })

  return (
    <AccordionDetails sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4
        }}
      >
        <CustomTextField
          select
          fullWidth
          label={bank.id ? 'Banco' + ' - ' + bank.code : 'Banco'}
          value={bank.id || 'default'}
          onChange={e => handleSelectBank(e.target.value, banks?.data)}
          error={Boolean(methods.formState.errors?.bankId)}
          {...(methods.formState.errors.bankId && { helperText: methods.formState.errors.bankId.message as any })}
        >
          <MenuItem value='default' disabled>
            Selecione
          </MenuItem>
          {handleCheckBanksAvailable(banks?.data, userBanks?.data)}
        </CustomTextField>
        {bank.id && formComponents[bank.code] ? (
          <DynamicFormFields
            typeMap={formComponents[bank.code]}
            fields={Object.keys(defaultValuesByStep[1][bank.code as keyof Step1DefaultValues])}
          />
        ) : null}
      </Box>
    </AccordionDetails>
  )
}

export default Banks
