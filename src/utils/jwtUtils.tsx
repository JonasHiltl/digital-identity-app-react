import { EdDSASigner, createJWT, Signer } from 'did-jwt'
import { decode } from 'bs58'

class JWTUtils {
  static async create(id: string, secretBs58: string, publicBs58: string) {
    const secretKey = decode(secretBs58)
    const publicKey = decode(publicBs58)
    const combinedKey = Buffer.concat([secretKey, publicKey])
    const signer: Signer = EdDSASigner(combinedKey)

    const jwt = await createJWT({}, { issuer: id, signer }, { alg: 'EdDSA' })
    return jwt
  }
}

export default JWTUtils
