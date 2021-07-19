import React from 'react'

import { PanelProps } from './types'
import PanelHeader from './PanelHeader'
import PanelFooter from './PanelFooter'

const componentClassName = 'se-ds-draggable-grid-board-panel'

const PanelRef: React.ForwardRefExoticComponent<PanelProps> = React.forwardRef<HTMLDivElement, PanelProps>((props, ref) => {

  const {
    style,
    className,
    key,
    posX,
    posY,
    width,
    height,
    header,
    footer,
    children
  } = props

  const HeaderComponent = typeof header === 'string' ? null : header

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
      style={style}
      key={key}
      data-grid={dataGrid}
      ref={ref}
    >
      {
        header && HeaderComponent !== null ? <HeaderComponent /> : <PanelHeader>{header}</PanelHeader>
      }
      {children}
      <PanelFooter />
    </div>
  )
})

export default PanelRef
