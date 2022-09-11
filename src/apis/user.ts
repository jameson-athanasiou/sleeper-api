import axios from 'axios'
import { baseUrlV1 } from '../config'

export type IndividualUser = {
  username: string
  user_id: string
  display_name: string
  avatar: string
}

export type GetUserByUsername = (username: string) => Promise<IndividualUser>
export type GetUserById = (userId: string) => Promise<IndividualUser>

const baseUrl = `${baseUrlV1}/user`

export const getUserByUsername = async (username: string) => {
  const url = `${baseUrl}/${username}`
  const result = await axios.get(url)
  return result.data
}

export const getUserById = async (userId: string) => {
  const url = `${baseUrl}/${userId}`
  const result = await axios.get(url)
  return result.data
}
