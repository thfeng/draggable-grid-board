import React from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'

import DashboardPanel from './components/DashboardPanel'

import './App.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>se-ds-dashboard</h1>
      </header>
      <div className="App-dashboard">
        <ResponsiveGridLayout
          className="-dashboard-layout"
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          cols={{lg: 6, md: 4, sm: 2, xs: 1, xxs: 1}}
          compactType="horizontal"
          isResizable
        >
          <DashboardPanel className="dashboard-panel" key="1">1</DashboardPanel>
          <DashboardPanel className="dashboard-panel" key="2">2</DashboardPanel>
          <DashboardPanel className="dashboard-panel" key="3">3</DashboardPanel>
          <DashboardPanel className="dashboard-panel" key="4">4</DashboardPanel>
          <DashboardPanel className="dashboard-panel" key="5">5</DashboardPanel>
          <DashboardPanel className="dashboard-panel" key="6">6</DashboardPanel>
        </ResponsiveGridLayout>
      </div>
    </div>
  )
}

export default App
