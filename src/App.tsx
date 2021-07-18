import React from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'

import { GridBoard, Panel }  from '@lib/index'

import './App.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>se-ds-dashboard</h1>
      </header>
      <div className="App-dashboard">
        <GridBoard className="dashboard-layout">
          <Panel key="1" posX={0} posY={0} width={2} height={2}>1</Panel>
          <Panel key="2" posX={2} posY={0} width={1} height={2}>2</Panel>
          <Panel key="3" posX={3} posY={0} width={2} height={2}>3</Panel>
        </GridBoard>
      </div>
    </div>
  )
}

export default App
