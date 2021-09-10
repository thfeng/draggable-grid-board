import React, { useState } from 'react'

import { GridBoard, Panel }  from '../lib'

import LogoSvg from './logo.svg'

import './App.css'

const App: React.FC = () => {

  const [items, updateItems] = useState(['aa', 'bb', 'cc'])

  const handleClickReset = () => {
    updateItems([])
  }

  const handleClickCreate = () => {
    const newKey = prompt('key') || ''
    updateItems([...items, newKey])
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>se-ds-dashboard</h1>
      </header>
      <div className="App-actions">
        <button className="reset-btn" onClick={handleClickReset}>Reset</button>
        <button className="create-btn" onClick={handleClickCreate}>New Panel</button>
      </div>
      <div className="App-dashboard">
        <GridBoard className="dashboard-layout" useResponsive>
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

          {
            items.map(item => {
              return <Panel key={item} posX={2} posY={2} width={1} height={2}>{`${item} panel`}</Panel>
            })
          }

          {
            /**
             *  The <div> with key 4 will not be added on the board
             */
          }
          <div key="4">4</div>
        </GridBoard>
      </div>
    </div>
  )
}

export default App
