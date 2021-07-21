import React from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { Panel } from '.'

import { GridBoardProps } from './types'
import { CompnentName, isNullOrUndefined } from './utils'

const DefaultGridBoardProps = {
  breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
  cols: {lg: 6, md: 4, sm: 2, xs: 1, xxs: 1},
  draggableCancel: '',
  draggableHandle: '',
  compactType: 'horizontal',
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
  onDrag: (layout) => {console.log(layout)},
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
  
  const validateChild = (child) => {
    const {
      key,
      props: {
        posX,
        posY,
        width,
        height,
      },
      type: {
        displayName
      }
    } = child
    if (displayName !== CompnentName.panel) {
      return false
    }
    if (isNullOrUndefined(key) || isNullOrUndefined(posX) || isNullOrUndefined(posY) || isNullOrUndefined(width) || isNullOrUndefined(height)) {
      return false
    }

    return true
  }

  const processItems = (child) => {

    if(!validateChild(child)) return null

    const {
      props: {
        posX,
        posY,
        width,
        height,
        minHeight = 1,
        minWidth = 1,
        isDraggable = true,
        isResizable = true,
        ...restProps
      },
      key
    } = child
    const dataGrid = {
      x: posX,
      y: posY,
      w: width,
      h: height,
      minH: minHeight,
      minW: minWidth,
      isDraggable,
      isResizable
    }
    return (
      <div key={key} data-grid={dataGrid}>
        <Panel {...restProps} />
      </div>
    )
  }

  return (
    <ResponsiveGridLayout
      {...layoutProps}
      className={`${componentClassName} ${layoutProps.className}`}
    >
      {
        React.Children.map(props.children, child => processItems(child))
      }
    </ResponsiveGridLayout>
  )
}

export default GridBoard
