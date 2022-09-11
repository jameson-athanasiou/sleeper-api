import axios from 'axios'
import { baseUrlV1 } from '../config'

const baseUrl = `${baseUrlV1}/avatars`

export const getAvatarThumbnail = async (id: string) => {
  const url = `${baseUrl}/thumbs/${id}`
  const result = await axios.get(url)
  return result.data
}

export const getAvatar = async (id: string) => {
  const url = `${baseUrl}/${id}`
  const result = await axios.get(url)
  return result.data
}
