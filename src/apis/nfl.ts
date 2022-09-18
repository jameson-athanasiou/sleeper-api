import axios from 'axios'
import { baseUrlV1 } from '../config'

enum SeasonType {
  pre,
  post,
  regular,
}

type NFLStatus = {
  week: number
  season_type: SeasonType
  season_start_date: string
  season: string
  previous_season: string
  leg: number
  league_season: string
  league_create_season: string
  display_week: number
}

export type GetNFLStatus = () => Promise<NFLStatus>

export const getNFLStatus: GetNFLStatus = async () => {
  const url = `${baseUrlV1}/state/nfl`
  const result = await axios.get(url)
  return result.data
}
