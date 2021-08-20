import { EdDSASigner, createJWT } from 'did-jwt'

class JWTUtils {
  static async create(id: string, secretKey: string, publicKey: string) {
    const signer = EdDSASigner(secretKey + publicKey)

    const jwt = await createJWT({}, { issuer: id, signer }, { alg: 'EdDSA' })
    console.log(jwt)
    return jwt
  }
}

export default JWTUtils
