import React from 'react'

import { PanelProps } from './types'
import { ClassNames, CompnentName } from './utils'
import PanelHeader from './PanelHeader'
import PanelFooter from './PanelFooter'

const panelClassName = ClassNames.panel
const panelContentClassName = ClassNames.panelContent
const draggableHandleClassName = ClassNames.draggableHandle

const Panel: React.FC<PanelProps> = (props) => {

  const {
    style,
    className,
    header,
    footer,
    children
  } = props

  const HeaderComponent = typeof header === 'string' ? null : header
  const FooterComponent = typeof footer === 'string' ? null : footer

  return (
    <div
      className={`${panelClassName} ${draggableHandleClassName} ${className}`}
      style={{height: '100%', ...style}}
    >
      {
        header && (HeaderComponent !== null ? {children} : <PanelHeader>{header}</PanelHeader>)
      }
      <div className={`${panelContentClassName}`}>
        {children}
      </div>
      {
        footer && (FooterComponent !== null ? {children} : <PanelFooter>{footer}</PanelFooter>)
      }
    </div>
  )
}

Panel.displayName = CompnentName.panel

export default Panel
