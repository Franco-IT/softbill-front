export interface ICryptoProvider {
  encrypt(token: string, key: string): { iv: string; encrypted: string }
  decrypt(encrypted: string, key: string, iv: string): string | null
}
