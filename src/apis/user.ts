import axios from 'axios'
import { baseUrlV1 } from './config'

const baseUrl = `${baseUrlV1}/user`

export const getUserByUsername = async (username: string) => {
  const url = `${baseUrl}/${username}`
  const result = await axios.get(url)
  return result
}

export const getUserById = async (userId: string) => {
  const url = `${baseUrl}/${userId}`
  const result = await axios.get(url)
  return result
}
