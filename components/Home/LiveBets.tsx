import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLiveMatches } from '@/hooks/useMatches'
import { previewMatches } from '@/constants/previewMatches'
import { SIMULATE } from '@/constants/demo'
import { Match } from '@/types/sports.types'

const LiveBets = () => {
  const { data } = useLiveMatches()

  /* No live fixtures exist yet, so dev builds fall back to local ones. */
  const matches =
    data && data.length ? data : SIMULATE.liveMatches ? previewMatches : []

  return (
    <View style={styles.section}>
      <Text className='text-3xl text-white mb-5' style={styles.heading}>Live Match</Text>

      {matches.length ? (
        <FlatList
          data={matches}
          renderItem={({ item }) => <LiveCard match={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.empty}>No live matches right now.</Text>
      )}
    </View>
  )
}

export default LiveBets

/* The API sends no crests, so a white circle stands in for each team. */
const TeamRow = ({ team, score }: { team: string; score?: number | null }) => (
  <View style={styles.row}>
    <View style={styles.crest} />
    <Text numberOfLines={1} style={styles.team}>{team}</Text>
    <Text style={styles.score}>{score ?? 0}</Text>
  </View>
)

export const LiveCard = ({ match }: { match: Match }) => {
  const kickoff = match.startTime
    ? new Date(match.startTime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : ''

  return (
    <View style={styles.card}>
      <View style={styles.liveDot} />

      <View>
        <TeamRow team={match.homeTeam} score={match.homeScore} />
        <TeamRow team={match.awayTeam} score={match.awayScore} />
      </View>

      <View style={styles.footer}>
        <Text numberOfLines={1} style={styles.league}>
          {match.league?.name ?? ''}
        </Text>
        <Text style={styles.live}>{'•'} Live {kickoff}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    paddingLeft: 20,
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DFDFDF',
  },
  heading: {
    fontStyle: 'italic',
  },
  empty: {
    color: '#B9CBD9',
    fontSize: 12,
  },
  card: {
    width: 201,
    height: 147,
    borderRadius: 10,
    backgroundColor: '#022645',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginRight: 20,
    justifyContent: 'space-between',
  },
  liveDot: {
    position: 'absolute',
    top: 12,
    right: 14,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F00000',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  crest: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
  },
  team: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  score: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 41,
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  league: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 10,
  },
  live: {
    color: '#F00000',
    fontSize: 10,
  },
})
