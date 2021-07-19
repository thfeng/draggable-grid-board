import React from 'react'

import { PanelHeaderProps } from './types'

const componentClassName = 'se-ds-draggable-grid-board-panel-header'

const PanelHeader: React.FC<PanelHeaderProps> = (props) => {
  const {
    className,
    children
  } = props
  
  return (
    <div className={`${componentClassName} ${className}`}>
      {children}
    </div>
  )
}

export default PanelHeader
