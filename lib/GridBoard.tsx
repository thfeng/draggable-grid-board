import React, { ReactNode } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { Panel } from '.'

import { GridBoardProps } from './types'
import { CompnentName, isNullOrUndefined } from './utils'

const DefaultGridBoardProps: GridBoardProps = {
  className: '',
  breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
  cols: {lg: 6, md: 4, sm: 2, xs: 1, xxs: 1},
  draggableCancel: '',
  draggableHandle: '',
  compactType: 'vertical',
  margin: [10, 10],
  containerPadding: [10, 10],
  autoSize: true,
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
  onResize: (layout,
    oldItem,
    newItem,
    placeholder,
    event,
    element) => {
      console.log(layout, oldItem, newItem, placeholder, event, element)
    },
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
      i: key,
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

  const renderPanels = (children: ReactNode):ReactNode[] => {
    return React.Children.map(children, child => processItems(child))
  }

  return (
    <ResponsiveGridLayout
      measureBeforeMount
      {...layoutProps}
      className={`${componentClassName} ${layoutProps.className}`}
    >
      {
        renderPanels(props.children)
      }
    </ResponsiveGridLayout>
  )
}

export default GridBoard
