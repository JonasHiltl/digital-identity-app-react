import { Document, KeyPair, KeyType, publish } from '@iota/identity-wasm/node'
import CLIENT_CONFIG from '../config'
import { DID } from '../types'
import SecureStorage from './secureStorage'

class DIDUtils {
  static async create() {
    const key: KeyPair = new KeyPair(KeyType.Ed25519)
    const doc: Document = Document.fromKeyPair(key)

    //Sign the DID Document with the generated key
    doc.sign(key)

    //Publish the Identity to the IOTA Network, this may take a few seconds to complete Proof-of-Work.
    const messageId: string = await publish(doc.toJSON(), CLIENT_CONFIG)

    const id = doc.id.toString()
    const created = doc.toJSON().created
    const did: DID = {
      id,
      created,
      key,
      messageId,
    }

    SecureStorage.save('did', JSON.stringify(did))
    return did
  }
}
