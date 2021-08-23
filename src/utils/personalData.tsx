import axios from 'axios'
import { PersonalDataCredential } from '../types'
import SecureStorage from './secureStorage'

class PersonalDataUtils {
  static async create(
    jwt: string,
    firstName: string,
    lastName: string,
    sex: string,
    dateOfBirth: string,
    streetNumber: string,
    postalCode: string,
    city: string,
    state: string,
    country: string,
  ) {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    }
    const body = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      dateOfBirth: dateOfBirth.trim(),
      sex: sex.trim(),
      streetNumber: streetNumber.trim(),
      city: city.trim(),
      state: state.trim(),
      postalCode: postalCode.trim(),
      country: country.trim(),
    }
    const res = await axios.post(
      'https://digital-identity-nestjs.herokuapp.com/personal-data/create/',
      body,
      config,
    )
    const credential: PersonalDataCredential = res.data
    SecureStorage.save('personal-data', JSON.stringify(credential))
    return credential
  }
}

export default PersonalDataUtils
