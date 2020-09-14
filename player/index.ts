import EventEmitter from "eventemitter3"
import { Howl } from 'howler'
import { VoiceData } from "../interfaces"

class Player extends EventEmitter {

  private voiceMap = new Map<string, Howl>()

  private _overlap = false
  public setOverlap(overlap: boolean) {
    this._overlap = overlap
  }

  private _loop = false
  public setLoop(loop: boolean) {
    this.voiceMap.forEach((h) => h.loop(loop))
    this._loop = loop
  }

  public get(voiceData: VoiceData) {
    let voice = this.voiceMap.get(voiceData.filename)
    if (!voice) {
      voice = new Howl({ src: [voiceData.filename], loop: this._loop })
      this.voiceMap.set(voiceData.filename, voice)
      voice.on('end', (a) => !this._loop && voice?.stop(a))
    }
    return voice
  }

  public play(voiceData: VoiceData) {
    let voice = this.get(voiceData)
    if (!this._overlap) {
      this.voiceMap.forEach((h) => h.stop())
    }
    voice.play()
  }

  public stop(voiceData: VoiceData) {
    let voice = this.get(voiceData)
    voice.stop()
  }

}

export const PlayerInstance = new Player()
export default PlayerInstance