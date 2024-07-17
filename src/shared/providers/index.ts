import { ErrorProvider } from './ErrorProvider'
import { CryptoJSProvider } from './CryptoJSProvider'
import { DateProvider } from './DateProvider'

const dateProvider = new DateProvider()
const errorProvider = new ErrorProvider()
const cryptoProvider = new CryptoJSProvider()

export { dateProvider, errorProvider, cryptoProvider }
