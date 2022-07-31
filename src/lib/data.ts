import { roundNumber } from './roundNumber'

export const isValidData = (data: any): data is Data => {
  if (!data.players || typeof data.players !== 'object') return false
  if (!data.topPlayers || typeof data.topPlayers !== 'object') return false
  if (!data.jgPlayers || typeof data.jgPlayers !== 'object') return false
  if (!data.midPlayers || typeof data.midPlayers !== 'object') return false
  if (!data.botPlayers || typeof data.botPlayers !== 'object') return false
  if (!data.supPlayers || typeof data.supPlayers !== 'object') return false

  return true
}

export const getCspm = (data: PlayerData) => {
  return roundNumber((data.creepScore * MINUTE_MS) / data.timePlayedMs, 1)
}

export const getDpm = (data: PlayerData) => {
  return roundNumber((data.damageDealt * MINUTE_MS) / data.timePlayedMs, 1)
}

export const getGpm = (data: PlayerData) => {
  return roundNumber((data.gold * MINUTE_MS) / data.timePlayedMs, 1)
}

export const getKda = (data: PlayerData) => {
  return roundNumber((data.kills + data.assists) / data.deaths, 2)
}

export const getVspm = (data: PlayerData) => {
  return roundNumber((data.visionScore * MINUTE_MS) / data.timePlayedMs, 1)
}

export const getWr = (data: PlayerData) => {
  return roundNumber(data.wins / data.gamesPlayed, 4) * 100
}

export interface Data {
  players: Players
  // Players by role.
  topPlayers: Players
  jgPlayers: Players
  midPlayers: Players
  botPlayers: Players
  supPlayers: Players
}

type Players = { [name: string]: PlayerData }

export interface PlayerData {
  assists: number
  creepScore: number
  damageDealt: number
  deaths: number
  kills: number
  gamesPlayed: number
  gold: number
  name: string
  teamKills: number
  timePlayedMs: number
  visionScore: number
  wins: number
}

const MINUTE_MS = 60_000
