import Head from 'next/head'
import React, { ReactNode, useEffect } from 'react'
import SettingContainer from '../containers/SettingContainer'
import createSnowDrop from '../utils/SnowDrop'
import ControlPanel from './ControlPanel'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout: React.FC<Props> = ({ children, title = '雪按钮 - Lamy button (,, •ω• ,,) و ♡' }) => {
  useEffect(() => {
    createSnowDrop()
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
        <div className="header">
          <div className="logo"><span>LAMY</span>&nbsp;<span>BUTTON</span></div>
          <ControlPanel />
        </div>

        {children}

        <div className="potato-mine"></div>
      </SettingContainer.Provider>
    </>
  )
}

export default Layout
