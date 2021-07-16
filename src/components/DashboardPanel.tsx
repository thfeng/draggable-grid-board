import React from 'react'
import { CoreProps } from 'react-grid-layout'

interface DashboardPanelProps {
  key: string
  children: HTMLElement | string
}

const DashboardPanel:React.ForwardRefExoticComponent<DashboardPanelProps & CoreProps> = React.forwardRef<HTMLDivElement, DashboardPanelProps & CoreProps>(({ style, className, ...props}, ref) => {
  
  const { children, key=String(Date.now() * Math.floor(Math.random() * 100)) } = props

  return (
    <div
      style={{...style}}
      className={`se-ds-dashboard-panel ${className}`}
      key={key}
      ref={ref}
    >
      {children}
    </div>  
  )
})

export default DashboardPanel