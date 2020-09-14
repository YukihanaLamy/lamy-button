import React from 'react'
import { useContainer } from 'unstated-next'
import SettingContainer, { ListModeLabel } from '../containers/SettingContainer'
import { OptionsLabel } from '../interfaces'
import { filterClassName as C } from '../utils/ClassNameTools'

interface ControlSwitchProps {
  title: string
  val: boolean
  setValue: React.Dispatch<React.SetStateAction<boolean>>
}

const ControlSwitch: React.FC<ControlSwitchProps> = ({ title, val, setValue }) => {
  return (
    <div className="flex mx-4 select-none">
      <div className="mr-3 text-main-color">{title}</div>
      <div className={C("w-8 cursor-pointer font-light", val ? "text-main-color" : "text-gray-400")} onClick={() => setValue(!val)}>
        {val ? 'ON' : 'OFF'}
      </div>
    </div>
  )
}

interface ControlListProps {
  title: string
  labels: OptionsLabel
  val: any
  setValue: React.Dispatch<React.SetStateAction<any>>
}

const ControlList: React.FC<ControlListProps> = ({ title, labels, val, setValue }) => {
  return (
    <div className="flex mx-4 select-none">
      <div className="mr-2 text-main-color">{title}</div>
      <div className="flex">
        {
          labels.map((label) => (
            <div
              key={label.value} onClick={() => setValue(label.value)}
              className={C("mx-1 cursor-pointer slash-split font-light", val === label.value ? "text-main-color" : "text-gray-400")}
            >{label.label}</div>
          ))
        }
      </div>
    </div>
  )
}

const ControlPanel: React.FC = () => {
  const {
    enableLoop, setEnableLoop,
    listMode, setListMode,
    enableOverlap, setEnableOverlap,
    // enable3D, setEnable3d,
  } = useContainer(SettingContainer)

  return (
    <div className="flex flex-wrap justify-center my-8">
      <ControlList title="播放模式" labels={ListModeLabel} val={listMode} setValue={setListMode} />
      <ControlSwitch title="洗脑循环" val={enableLoop} setValue={setEnableLoop} />
      <ControlSwitch title="重叠播放" val={enableOverlap} setValue={setEnableOverlap} />
      {/* <ControlSwitch title="模拟环绕" val={enable3D} setValue={setEnable3d} /> */}
    </div>
  )
}

export default ControlPanel