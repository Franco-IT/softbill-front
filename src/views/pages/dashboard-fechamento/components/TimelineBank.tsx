import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'
import CustomBankAccordion from './CustomBankAccordion'
import { styled } from '@mui/material/styles'
import { bankProps } from '../types'

const TimelineContainer = styled(MuiTimeline)<TimelineProps>({
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

interface TimelineBankProps {
  bank: bankProps
}

const TimelineBank = ({ bank }: TimelineBankProps) => {
  const CustomBankAccordionProps = {
    bank: bank
  }

  return (
    <TimelineContainer>
      <CustomBankAccordion {...CustomBankAccordionProps} />
    </TimelineContainer>
  )
}

export default TimelineBank
