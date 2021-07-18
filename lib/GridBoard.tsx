import React from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'

import { GridBoardProps } from './types'

const DefaultGridBoardProps = {
  breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
  cols: {lg: 6, md: 4, sm: 2, xs: 1, xxs: 1},
  draggableCancel: '',
  draggableHandle: '',
  compactType: 'vertical',
  margin: [10, 10],
  containerPadding: [10, 10],
  rowHeight: 150,
  isDraggable: true,
  isResizable: true,
  isBounded: true,
  isDroppable: false,
  preventCollision: false,
  resizeHandles: ['se'],
  resizeHandle: null,
  onLayoutChange: () => {},
  onDragStart: () => {},
  onDrag: () => {},
  onDragStop: () => {},
  onResizeStart: () => {},
  onResize: () => {},
  onResizeStop: () => {},
  onDrop: () => {},
}

const componentClassName = 'se-ds-draggable-grid-board'

const ResponsiveGridLayout = WidthProvider(Responsive)

const GridBoard: React.FC<GridBoardProps> = (props) => {
  const layoutProps = Object.assign(DefaultGridBoardProps, props)

  return (
    <ResponsiveGridLayout
      {...layoutProps}
      className={`${componentClassName} ${layoutProps.className}`}
    />
  )
}

export default GridBoard
