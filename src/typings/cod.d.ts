/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
type Platform = 'battle' | 'steam' | 'psn' | 'xbl' | 'acti' | 'uno' | 'all'

interface Config {
  platform?: Platform,
  debug?: number,
}

declare module 'call-of-duty-api' {
  class CallOfDuty {
    constructor(config = {} as Config) {}

    login(email: string, password: string): Promise<string>
    MWBattleData(tag: string, platform?: Platform): Promise<{
      [x: string]: {
        'wins': number,
        'kills': number,
        'kdRatio': number,
        'downs': number,
        'topTwentyFive': number,
        'topTen': number,
        'contracts': number,
        'revives': number,
        'topFive': number,
        'score': number,
        'timePlayed': number,
        'gamesPlayed': number,
        'tokens': number,
        'scorePerMinute': number,
        'cash': number,
        'deaths': number,
        'title': string,
      }
    }>
    MWmp(tag: string, platform?: Platform): Promise<{
      lifetime: {
        all: {
          properties: {
            recordLongestWinStreak: number,
            recordXpInAMatch: number,
            accuracy: number,
            losses: number,
            totalGamesPlayed: number,
            score: number,
            winLossRatio: number,
            totalShots: number,
            bestScoreXp: number,
            gamesPlayed: number,
            bestSquardKills: number,
            bestSguardWave: number,
            bestConfirmed: number,
            deaths: number,
            wins: number,
            bestSquardCrates: number,
            kdRatio: number,
            bestAssists: number,
            bestFieldgoals: number,
            bestScore: number,
            recordDeathsInAMatch: number,
            scorePerGame: number,
            bestSPM: number,
            bestKillChains: number,
            recordKillsInAMatch: number,
            suicides: number,
            wlRatio: number,
            currentWinStreak: number,
            bestMatchBonusXp: number,
            bestMatchXp: number,
            bestSguardWeaponLevel: number,
            bestKD: number,
            kills: number,
            bestKillsAsInfected: number,
            bestReturns: number,
            bestStabs: number,
            bestKillsAsSurvivor: number,
            timePlayedTotal: number,
            bestDestructions: number,
            headshots: number,
            bestRescues: number,
            assists: number,
            ties: number,
            recordKillStreak: number,
            bestPlants: number,
            misses: number,
            bestDamage: number,
            bestSetbacks: number,
            bestTouchdowns: number,
            scorePerMinute: number,
            bestDeaths: number,
            bestMedalXp: number,
            bestDefends: number,
            bestSquardRevives: number,
            bestKills: number,
            bestDefuses: number,
            bestCaptures: number,
            hits: number,
            bestKillStreak: number,
            bestDenied: number
          }
        }
      }
    }>
  }

  export default function module(config = {} as Config): CallOfDuty
}
