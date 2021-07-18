import React from 'react'

import { PanelProps } from './types'
import PanelHeader from './PanelHeader'

const componentClassName = 'se-ds-draggable-grid-board-panel'

const Panel: React.FC<PanelProps> = (props) => {

  const {
    className,
    key,
    posX,
    posY,
    width,
    height,
    children
  } = props

  const dataGrid = {
    i: key,
    x: posX,
    y: posY,
    w: width,
    h: height,
  }

  return (
    <div
      className={`${componentClassName} ${className}`}
      key={key}
      data-grid={dataGrid}
    >
      <PanelHeader />
      {children}
    </div>
  )
}

export default Panel
