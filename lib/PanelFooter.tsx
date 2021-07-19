import React from 'react'

import { PanelFooterProps } from './types'

const componentClassName = 'se-ds-draggable-grid-board-panel-footer'

const PanelFooter: React.FC<PanelFooterProps> = (props) => {
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

export default PanelFooter
