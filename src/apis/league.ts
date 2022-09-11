import axios from 'axios'
import { baseUrlV1 } from '../config'

export type Matchup = {
  custom_points: string | null
  matchup_id: number
  players: string[]
  players_points: Record<string, number>
  points: number
  roster_id: number
  starters: string[]
  starters_points: number[]
}

export type LeagueDetails = {
  total_rosters: number
  status: string
  sport: string
  settings: Record<string, unknown>
  season_type: string
  season: string
  scoring_settings: Record<string, unknown>
  roster_positions: unknown[]
  previous_league_id: string
  name: string
  league_id: string
  draft_id: string
  avatar: string
}

export type RosterSettings = {
  wins: number
  waiver_position: number
  waiver_budget_used: number
  total_moves: number
  ties: number
  losses: number
  fpts_decimal: number
  fpts_against_decimal: number
  fpts_against: number
  fpts: number
}

export type Roster = {
  starters: string[]
  settings: RosterSettings
  roster_id: number
  reserve: unknown[]
  players: string[]
  owner_id: string
  league_id: string
}

export type UserMetaData = {
  team_name: string
}

export type User = {
  user_id: string
  username: string
  display_name: string
  avatar: string
  metadata: UserMetaData
  is_owner: boolean
}

export type GetMatchupsByWeek = (leagueId: string, week: number) => Promise<Matchup[]>
export type getHeadToHeadMatchupsByWeek = (leagueId: string, week: number) => Promise<Matchup[][]>
export type GetLeagueDetails = (leagueId: string) => Promise<LeagueDetails>
export type GetRosters = (leagueId: string) => Promise<Roster[]>
export type GetUsersByLeague = (leagueId: string) => Promise<User[]>

const baseUrl = `${baseUrlV1}/league`

export const getMatchupsByWeek: GetMatchupsByWeek = async (leagueId, week) => {
  const url = `${baseUrl}/${leagueId}/matchups/${week}`
  const result = await axios.get<Matchup[]>(url)
  return result.data
}

export const getHeadToHeadMatchupsByWeek: getHeadToHeadMatchupsByWeek = async (leagueId, week) => {
  const matchups = await getMatchupsByWeek(leagueId, week)
  const matchupsCount = matchups.length / 2

  const headToHeadMatchups = []

  for (let i = 0; i < matchupsCount; i += 1) {
    const games = matchups.filter(({ matchup_id }) => matchup_id === i + 1)
    headToHeadMatchups.push(games)
  }

  return headToHeadMatchups
}

export const getLeagueDetails: GetLeagueDetails = async (leagueId) => {
  const url = `${baseUrl}/${leagueId}`
  const result = await axios.get(url)
  return result.data
}

export const getRosters: GetRosters = async (leagueId) => {
  const url = `${baseUrl}/${leagueId}/rosters`
  const result = await axios.get(url)
  return result.data
}

export const getUsersByLeague: GetUsersByLeague = async (leagueId) => {
  const url = `${baseUrl}/${leagueId}/users`
  const result = await axios.get(url)
  return result.data
}
