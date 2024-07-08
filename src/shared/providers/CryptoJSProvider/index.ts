import CryptoJS from 'crypto-js'
import { ICryptoProvider } from './ICryptoProvider'

const CRYPTO_KEY = process.env.NEXT_PUBLIC_CRYPTO_KEY || 'chave_padrao_secreta'

class CryptoJSProvider implements ICryptoProvider {
  encrypt(token: string): { iv: string; encrypted: string } {
    const iv = CryptoJS.lib.WordArray.random(16).toString()
    const encrypted = CryptoJS.AES.encrypt(token, CryptoJS.enc.Hex.parse(CRYPTO_KEY), {
      iv: CryptoJS.enc.Hex.parse(iv)
    }).toString()

    return { iv, encrypted }
  }

  decrypt(encrypted: string, iv: string): string | null {
    try {
      const decrypted = CryptoJS.AES.decrypt(encrypted, CryptoJS.enc.Hex.parse(CRYPTO_KEY), {
        iv: CryptoJS.enc.Hex.parse(iv)
      }).toString(CryptoJS.enc.Utf8)

      return decrypted
    } catch (error) {
      return null
    }
  }
}

export { CryptoJSProvider }
