import { Howl } from 'howler'
import React, { useCallback, useEffect, useState } from 'react'
import { useContainer } from 'unstated-next'
import SettingContainer from '../containers/SettingContainer'
import { VoiceData } from '../interfaces'
import PlayerInstance from '../player'
import { filterClassName as C } from '../utils/ClassNameTools'

export interface IPlayerButtonProps {
  voiceData: VoiceData
}

const PlayerButton: React.FC<IPlayerButtonProps> = ({ voiceData }) => {
  const [player, setPlayer] = useState<Howl>()
  const [isPlay, setIsPlay] = useState(false)
  const {
    enableLoop,
  } = useContainer(SettingContainer)

  const play = useCallback(() => {
    if (!player) {
      setPlayer(PlayerInstance.get(voiceData))
    }
    PlayerInstance.play(voiceData)
  }, [voiceData, player])

  const handlerClick = useCallback(() => {
    if (enableLoop && isPlay) {
      PlayerInstance.stop(voiceData)
    } else {
      play()
    }
  }, [enableLoop, isPlay, play])

  useEffect(() => {
    if (player) {
      const onPlayHandler = () => setIsPlay(true)
      const onStopHandler = () => setIsPlay(false)

      player.on('play', onPlayHandler)
      player.on('stop', onStopHandler)
      return () => {
        player.off('play', onPlayHandler)
        player.off('stop', onStopHandler)
      }
    }
  }, [player])

  return (
    <div className="bg-btn-color select-none rounded-md px-6 py-2 text-white mx-4 mb-6 cursor-pointer flex items-center" onClick={handlerClick}>
      <div className={C("play-status mr-2", !isPlay ? "status-play" : "status-stop")}></div>
      <div>{voiceData.title}</div>
    </div>
  )
}

export default PlayerButton