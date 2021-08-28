import { ContactInformationCredential } from '../../types'
import api from '../../utils/axios'
import SecureStorage from '../../utils/secureStorage'

class ContactInformationUtils {
  static async create(jwt: string, email: string, phoneNumber: string) {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    }
    const body = {
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
    }
    const res = await api.post('/personal-data/create/', body, config)
    const credential: ContactInformationCredential = res.data
    SecureStorage.save('contact-information', JSON.stringify(credential))
    return credential
  }
}

export default ContactInformationUtils
