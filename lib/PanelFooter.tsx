import React from 'react'

import { PanelFooterProps } from './types'
import { ClassNames } from './utils'

const componentClassName = ClassNames.panelFooter

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
