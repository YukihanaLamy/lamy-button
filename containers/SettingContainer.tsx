import { useEffect, useState } from "react"
import { createContainer } from "unstated-next"
import { OptionsLabel } from "../interfaces"
import PlayerInstance from "../player"

export enum ListMode {
  None = 'none',
  Random = 'random',
  List = 'list',
}

export const ListModeText = {
  [ListMode.None]: '点啥放啥',
  // [ListMode.Random]: '随便来点',
  // [ListMode.List]: '列表放完',
}

export const ListModeLabel: OptionsLabel = Object.entries(ListModeText).map(([k, v]) => ({ label: v, value: k }))

function useSetting() {
  const [listMode, setListMode] = useState(ListMode.None)
  const [enableLoop, setEnableLoop] = useState(false)
  const [enableOverlap, setEnableOverlap] = useState(false)
  const [enable3D, setEnable3d] = useState(false)

  useEffect(() => {
    PlayerInstance.setLoop(enableLoop)
  }, [enableLoop])

  useEffect(() => {
    PlayerInstance.setOverlap(enableOverlap)
  }, [enableOverlap])

  return {
    enableLoop, setEnableLoop,
    listMode, setListMode,
    enableOverlap, setEnableOverlap,
    enable3D, setEnable3d,
  }
}

export const SettingContainer = createContainer(useSetting)
export default SettingContainer