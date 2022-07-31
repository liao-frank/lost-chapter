import bottomIconPath from '../images/bottom-icon.png'
import creepScoreIconPath from '../images/creep-score-icon.png'
import damageDealtIconPath from '../images/damage-dealt-icon.png'
import fillIconPath from '../images/fill-icon.png'
import goldIconPath from '../images/gold-icon.png'
import jungleIconPath from '../images/jungle-icon.png'
import kdaIconPath from '../images/kda-icon.png'
import middleIconPath from '../images/middle-icon.png'
import supportIconPath from '../images/support-icon.png'
import topIconPath from '../images/top-icon.png'
import visionScoreIconPath from '../images/vision-score-icon.png'

import classNames from 'classnames'
import { sortBy } from 'lodash'
import { PropsWithChildren } from 'react'

import {
  Data,
  PlayerData,
  getCspm,
  getDpm,
  getGpm,
  getKda,
  getVspm,
  getWr,
} from '../lib/data'
import { useLocalStorageString } from '../lib/hooks/useLocalStorage'
import { roundNumber } from '../lib/roundNumber'
import { Icon, ImageIcon } from './Icon'
import { Scrollable } from './Scrollable'

export const PlayerTable = ({
  className,
  data,
}: {
  className?: string
  data: Data
}) => {
  const tableWidth = 'calc(100% - 2rem)'

  const [dataSelector, setDataSelector] = useLocalStorageString<DataSelector>(
    '2e01a55c-0dc2-4a93-9f40-67885a4353e8',
    'players'
  )
  const [sort, setSort] = useLocalStorageString<Sort>(
    'd0ef7cd5-e546-4871-9ad6-98752ce2a270',
    'name'
  )
  const [sortDir, setSortDir] = useLocalStorageString<'asc' | 'desc'>(
    '5e1ba4da-6e15-462c-9c73-6f22cd412e33',
    'asc'
  )

  const setOrToggleSort = (nextSort: Sort) => {
    if (sort === nextSort) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSort(nextSort)
      setSortDir('asc')
    }
  }

  const playersArr = SORT_TO_SORTERS[sort](Object.values(data[dataSelector]))
  if (sortDir === 'desc') playersArr.reverse()

  const header = (
    <PlayerTableHeader
      className="h-2"
      sort={sort}
      sortDir={sortDir}
      onSort={setOrToggleSort}
    />
  )

  return (
    <div className={classNames(className, 'relative w-full')}>
      <RoleSelector currSelector={dataSelector} onSelector={setDataSelector} />
      <div className="mt-12 relative">
        <table className="table-auto" style={{ width: tableWidth }}>
          {header}
          <PlayerTableBody className="invisible" players={playersArr} />
        </table>
        <Scrollable className="!absolute h-[32rem] top-[2.75rem] w-full">
          <table
            className="table-auto -translate-y-[2.75rem]"
            style={{ width: tableWidth }}
          >
            {header}
            <PlayerTableBody players={playersArr} />
          </table>
        </Scrollable>
      </div>
    </div>
  )
}

const RoleSelector = ({
  currSelector,
  onSelector,
}: {
  currSelector: DataSelector
  onSelector: (selector: DataSelector) => void
}) => {
  const RoleIcon = ({ selector }: { selector: DataSelector }) => {
    return (
      <Icon
        className={classNames(
          'role-icon',
          currSelector === selector && 'active',
          currSelector !== selector && 'role-clickable'
        )}
        onClick={() => void onSelector(selector)}
        size="2rem"
        src={
          {
            players: fillIconPath,
            topPlayers: topIconPath,
            jgPlayers: jungleIconPath,
            midPlayers: middleIconPath,
            botPlayers: bottomIconPath,
            supPlayers: supportIconPath,
          }[selector]
        }
      />
    )
  }

  return (
    <div className="flex items-center justify-start w-full">
      <RoleIcon selector="players" />
      <RoleIcon selector="topPlayers" />
      <RoleIcon selector="jgPlayers" />
      <RoleIcon selector="midPlayers" />
      <RoleIcon selector="botPlayers" />
      <RoleIcon selector="supPlayers" />
    </div>
  )
}

const PlayerTableHeader = ({
  className,
  sort,
  sortDir,
  onSort,
}: {
  className?: string
  sort: Sort
  sortDir: 'asc' | 'desc'
  onSort: (sort: Sort) => void
}) => {
  const Th = ({
    children,
    sort: cellSort,
    tooltip,
  }: PropsWithChildren<{ sort?: Sort; tooltip?: string }>) => {
    return (
      <th
        className={classNames(
          sort === cellSort && sortDir,
          tooltip && 'with-tooltip',
          cellSort && '!cursor-pointer'
        )}
        data-tooltip-content={tooltip}
        onClick={cellSort ? () => void onSort(cellSort) : undefined}
      >
        {children}
      </th>
    )
  }

  return (
    <thead className={classNames(className, 'select-none')}>
      <tr>
        <Th sort="name">Summoner</Th>
        <Th sort="wr">Win Rate</Th>
        <Th sort="kda" tooltip="Kill Score">
          <ImageIcon src={kdaIconPath} />
        </Th>
        <Th sort="dpm" tooltip="Damage dealt to champions">
          <ImageIcon src={damageDealtIconPath} />
        </Th>
        {/* <th
          className="with-tooltip"
          data-tooltip-content="Damage taken from champions"
        >
          <ImageIcon src={damageTakenIconPath} />
        </th> */}
        {/* <th className="with-tooltip" data-tooltip-content="Crowd control score">
          <ImageIcon src={crowdControlIconPath} />
        </th> */}
        <Th sort="gpm" tooltip="Gold earned">
          <ImageIcon src={goldIconPath} />
        </Th>
        <Th sort="cspm" tooltip="Minions slain">
          <ImageIcon src={creepScoreIconPath} />
        </Th>
        <Th sort="vspm" tooltip="Vision score">
          <ImageIcon src={visionScoreIconPath} />
        </Th>
      </tr>
    </thead>
  )
}

const PlayerTableBody = ({
  className,
  players,
}: {
  className?: string
  players: PlayerData[]
}) => {
  return (
    <tbody className={className}>
      {players.map((player) => (
        <tr key={player.name}>
          <td className="secondary">{player.name}</td>
          <td>
            {getWr(player) + '%'}
            <div className="secondary">
              {player.gamesPlayed}G&nbsp;
              {player.wins}W&nbsp;
              {player.gamesPlayed - player.wins}L
            </div>
          </td>
          <td>
            {getKda(player)}
            <div className="secondary">
              {roundNumber(player.kills / player.gamesPlayed, 1)}&nbsp;/&nbsp;
              {roundNumber(player.deaths / player.gamesPlayed, 1)}&nbsp;/&nbsp;
              {roundNumber(player.assists / player.gamesPlayed, 1)}
            </div>
          </td>
          <td>
            {getDpm(player)}
            &nbsp;/ min
            <div className="secondary">
              {roundNumber(player.damageDealt / player.gamesPlayed, 1)}
            </div>
          </td>
          <td>
            {getGpm(player)}
            &nbsp;/ min
            <div className="secondary">
              {roundNumber(player.gold / player.gamesPlayed, 1)}
            </div>
          </td>
          <td>
            {getCspm(player)}
            &nbsp;/ min
            <div className="secondary">
              {roundNumber(player.creepScore / player.gamesPlayed, 1)}
            </div>
          </td>
          <td>
            {getVspm(player)}
            &nbsp;/ min
            <div className="secondary">
              {roundNumber(player.visionScore / player.gamesPlayed, 1)}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  )
}

type DataSelector =
  | 'players'
  | 'topPlayers'
  | 'jgPlayers'
  | 'midPlayers'
  | 'botPlayers'
  | 'supPlayers'

type Sort = 'name' | 'wr' | 'kda' | 'dpm' | 'gpm' | 'cspm' | 'vspm'

const SORT_TO_SORTERS: Record<Sort, (data: PlayerData[]) => PlayerData[]> = {
  name: (data) => sortBy(data, (data) => data.name.toLowerCase()),
  wr: (data) => sortBy(data, getWr),
  kda: (data) => sortBy(data, getKda),
  dpm: (data) => sortBy(data, getDpm),
  gpm: (data) => sortBy(data, getGpm),
  cspm: (data) => sortBy(data, getCspm),
  vspm: (data) => sortBy(data, getVspm),
}
