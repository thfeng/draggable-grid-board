import React from 'react'

import { PanelHeaderProps } from './types'
import { ClassNames } from './utils'

const componentClassName = ClassNames.panelHeader

const PanelHeader: React.FC<PanelHeaderProps> = (props) => {
  const {
    className,
    children
  } = props
  
  return (
    <div className={`${componentClassName} ${className}`}>
      <h2>{children}</h2>
    </div>
  )
}

export default PanelHeader
