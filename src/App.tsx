import React from 'react'

import { GridBoard, Panel }  from '@lib/index'

import LogoSvg from './logo.svg'

import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>se-ds-dashboard</h1>
      </header>
      <div className="App-dashboard">
        <GridBoard className="dashboard-layout">
          <Panel className="dashboard-panel" key="1" posX={0} posY={0} width={4} height={2}>
            <img src={LogoSvg} width="200" height="200" />
          </Panel>
          <Panel className="dashboard-panel" key="2" posX={2} posY={2} width={1} height={2}>2</Panel>
          <Panel
            className="dashboard-panel"
            key="3"
            posX={3}
            posY={0}
            width={2}
            height={3}
            header="Panel 3"
            footer="The footer of Panel 3"
          ></Panel>
          {/* The <div> with key 4 will not be added on the board */}
          <div key="4">4</div>
        </GridBoard>
      </div>
    </div>
  )
}

export default App
