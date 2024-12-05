import React from 'react'
import Minesweeper from '../page/Minesweeper'

export default function PageLayout() {

  return (
    <div className='min-h-screen max-w-screen overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900'>
      <Minesweeper/>
    </div>
  )
}
