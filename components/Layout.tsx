import Head from 'next/head'
import React, { ReactNode, useEffect } from 'react'
import SettingContainer from '../containers/SettingContainer'
import ControlPanel from './ControlPanel'

type Props = {
  children?: ReactNode
  title?: string
  hideHeader?: boolean
}

const Layout: React.FC<Props> = ({ children, title = '雪按钮 - Lamy button (,, •ω• ,,) و ♡', hideHeader = false }) => {
  useEffect(() => {
    // createSnowDrop()
  }, [])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <SettingContainer.Provider>
        <div className="in-develop text-sm">* 功能试验版本，不代表最终品质</div>
        {
          !hideHeader && <div className="header">
            <div className="logo"><span>LAMY</span>&nbsp;<span>BUTTON</span></div>
            <ControlPanel />
          </div>
        }

        {children}

        {/* <div className="potato-mine"></div> */}
      </SettingContainer.Provider>
    </>
  )
}

export default Layout
