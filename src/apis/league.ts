import axios from 'axios'
import { baseUrlV1 } from '../config'

type MatchupType = {
  custom_points: string | null
  matchup_id: number
  players: string[]
  players_points: Record<string, number>
  points: number
  roster_id: number
  starters: string[]
  starters_points: number[]
}

type GetMatchupsByWeekType = (leagueId: string, week: number) => Promise<MatchupType[]>

const baseUrl = `${baseUrlV1}/league`

export const getMatchupsByWeek: GetMatchupsByWeekType = async (leagueId, week) => {
  const url = `${baseUrl}/${leagueId}/matchups/${week}`
  const result = await axios.get<MatchupType[]>(url)
  return result.data
}

export const getHeadToHeadMatchupsByWeek = async (leagueId: string, week: number) => {
  const matchups = await getMatchupsByWeek(leagueId, week)
  const matchupsCount = matchups.length / 2

  const headToHeadMatchups = []

  for (let i = 0; i < matchupsCount; i += 1) {
    const games = matchups.filter(({ matchup_id }) => matchup_id === i + 1)
    headToHeadMatchups.push(games)
  }

  return headToHeadMatchups
}

export const getLeagueDetails = async (leagueId: string) => {
  const url = `${baseUrl}/${leagueId}`
  const result = await axios.get(url)
  return result.data
}

export const getRosters = async (leagueId: string) => {
  const url = `${baseUrl}/${leagueId}/rosters`
  const result = await axios.get(url)
  return result.data
}
