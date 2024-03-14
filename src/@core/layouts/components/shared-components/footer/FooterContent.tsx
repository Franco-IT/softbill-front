import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import themeConfig from 'src/configs/themeConfig'

const FooterContent = () => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2, display: 'flex', color: 'text.secondary' }}>
        {`${themeConfig.templateName} © ${new Date().getFullYear()}, Todos os direitos reservados.`}
      </Typography>
    </Box>
  )
}

export default FooterContent
