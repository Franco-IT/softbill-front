import { ErrorProvider } from './ErrorProvider'
import { CryptoJSProvider } from './CryptoJSProvider'

const errorProvider = new ErrorProvider()
const cryptoProvider = new CryptoJSProvider()

export { errorProvider, cryptoProvider }
