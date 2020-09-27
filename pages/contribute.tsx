import Axios from 'axios'
import { Duration } from 'luxon'
import React, { useCallback, useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import ReactPlayer from 'react-player'
import Layout from '../components/Layout'
import useRequest from '../hooks/useRequest'

interface AudioResource {
  id: string
  videoUrl: string
  startTime: string
  duration: string
  title: string
  author: string
}

const Contribute: React.FC = () => {
  const { handleSubmit, register, watch, reset, setValue } = useForm({ defaultValues: { videoUrl: "https://www.youtube.com/watch?v=hN9-1_HxodE" } })
  const { data, isValidating, revalidate } = useRequest<{ rows: AudioResource[] }>({ method: 'GET', url: '/api/resources/audio' })
  const playerRef = useRef<any>()
  const currentResources = useMemo(() => data?.rows, [data])

  const youtubeUrl = watch('videoUrl')
  const startTime = watch('startTime')

  const onSubmit = useCallback(async (data: any) => {
    await Axios.post('/api/resources/audio', data)
    reset({
      videoUrl: youtubeUrl
    })
    revalidate()
  }, [reset, revalidate, youtubeUrl])

  const fillCurrentTime = useCallback(() => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime()
      setValue('startTime', Duration.fromMillis(currentTime * 1000).toFormat('hh:mm:ss'))
    }
  }, [setValue])

  const fillCurrentDuration = useCallback(() => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime()
      const [hour, minute, second] = startTime.split(':')
      const s = Duration.fromObject({ hour, minute, second })
      const e = Duration.fromMillis(currentTime * 1000)
      setValue('duration', `${Math.ceil(+e.minus(s).toFormat('S') / 1000)}`)
    }
  }, [startTime])

  return (
    <Layout hideHeader={true}>
      <div className="flex items-center justify-center pt-24">
        <div className="logo"><span>LAMY</span>&nbsp;<span>BUTTON</span></div>
      </div>
      <div className="mx-6 md:mx-auto md:w-2/3 pt-4 tb-24">
        <div className="text-center text-main-color font-bold text-xl">出一份力 ヾ(◍°∇°◍)ﾉﾞ</div>

        <div className="mt-4">
          <div className="text-center text-gray-800 text-lg leading-loose">贡献代码</div>
          <div className="text-center leading-loose text-sm text-gray-600"><a href="https://github.com/YukihanaLamy/lamy-button">大佬快到碗里来，救救孩子！</a></div>
        </div>

        <div className="mt-4">
          <div className="text-center text-gray-800 text-lg leading-loose">投稿</div>
          <div className="text-center leading-loose text-sm text-gray-600">不会剪音频也没关系，只要填入视频和时间就 OK ！</div>
          <form className="md:w-3/4 mx-auto my-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="videoUrl">
                视频链接（仅支持 YouTube）
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="videoUrl" name="videoUrl" type="text" placeholder="https://www.youtube.com/watch?v=hN9-1_HxodE" ref={register()} />
            </div>
            <div className="flex justify-center mb-4">
              {youtubeUrl && <ReactPlayer url={youtubeUrl} ref={playerRef} controls={true} />}
            </div>
            <div className="mb-4 flex justify-between -mx-4 flex-col md:flex-row">
              <div className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer mx-4 my-2" onClick={fillCurrentTime}>填入当前时间为开始时间</div>
              <div className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer mx-4 my-2" onClick={fillCurrentDuration}>填入当前时间为时长</div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                按钮
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" name="title" type="text" placeholder="起个好名字！" ref={register()} />
            </div>
            <div className="mb-4 flex -mx-2">
              <div className="flex-1 mx-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">
                  开始时间
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="startTime" name="startTime" type="text" placeholder="格式：00:02:33" ref={register()} />
              </div>
              <div className="flex-1 mx-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
                  时长
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="duration" name="duration" type="text" placeholder="单位：秒" ref={register()} />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                投稿人
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="author" name="author" type="text" placeholder="感谢参与！" ref={register()} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                备注
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="author" name="author" type="text" placeholder="投稿会自动剪裁，但会有人工修整环节，有什么需要可以写下来" ref={register()} />
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">提交</button>
          </form>
        </div>

        <div className="mt-4">
          <div className="text-center text-gray-800 text-lg leading-loose">待处理投稿</div>
          <div className="text-center leading-loose text-sm text-gray-600">* 仅测试使用，正式发布时将移除该部分（即未来不会公开展示待处理稿件）</div>
          {
            isValidating ? <div>加载中</div> :
            currentResources?.length
              ? currentResources.map((res) => {
                return (
                  <div className="bg-white rounded-lg shadow-lg my-4 p-6 relative leading-loose" key={res.id}>
                    <div className="text-gray-300 text-sm absolute p-4 right-0 top-0">#{res.id}</div>
                    <div className="break-all">按钮：{res.title}</div>
                    <div className="break-all">视频链接：<a href={res.videoUrl} className="break-all" rel="noopener noreferrer" target="_blank">{res.videoUrl}</a></div>
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-1 break-all">开始时间：{res.startTime}</div>
                      <div className="flex-1 break-all">时长：{res.duration}</div>
                      <div className="flex-1 break-all">投稿人：{res.author}</div>
                    </div>
                  </div>
                )
              })
              : <div>没有了哦</div>
          }
        </div>
      </div>
    </Layout>
  )
}

export default Contribute