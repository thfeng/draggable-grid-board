import React, { ReactElement, ReactNode } from 'react'
import GridLayout, { Responsive, WidthProvider } from 'react-grid-layout'
import PanelNode from './PanelNode'

import { GridBoardProps, ResponsiveGridBoardProps, PanelWrapperProps, GridBoardCommonProps } from './types'
import { CompnentName, isNullOrUndefined } from './utils'

const DefaultGridBoardCommonProps: GridBoardCommonProps = {
  className: '',
  draggableCancel: '',
  draggableHandle: '',
  compactType: 'vertical',
  autoSize: true,
  rowHeight: 150,
  isDraggable: true,
  isResizable: true,
  isBounded: true,
  isDroppable: false,
  preventCollision: false,
  resizeHandles: ['se'],
  resizeHandle: undefined,
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

const DefaultGridBoardProps = Object.assign(DefaultGridBoardCommonProps, {
  cols: 12,
  margin: [10, 10],
  containerPadding: [10, 10],
  onLayoutChange: () => {}
})
const DefaultGridResponsiveBoardProps = Object.assign(DefaultGridBoardCommonProps, {
  cols: { lg: 6, md: 4, sm: 2, xs: 1, xxs: 1 },
  breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
  margin: [10, 10],
  containerPadding: [10, 10],
  onLayoutChange: () => {},
})

const componentClassName = 'se-ds-draggable-grid-board'

const ResponsiveGridLayout = WidthProvider(Responsive)

const GridBoard: React.FC<GridBoardProps & ResponsiveGridBoardProps> = (props) => {
  
  const validateChild = (child: ReactElement<PanelWrapperProps, any>) => {
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

  const processItems = (child: ReactElement<PanelWrapperProps, any>) => {

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
        <PanelNode {...restProps} />
      </div>
    )
  }

  const renderPanels = (children: ReactNode) => {
    return React.Children.map(children as ReactElement<PanelWrapperProps>, (child) => processItems(child))
  }

  const renderGridBoard = () => {
    const layoutProps: GridBoardProps = Object.assign(DefaultGridBoardProps, props)

    return (
      <GridLayout
        {...layoutProps}
        className={`${componentClassName} ${layoutProps.className}`}
      >
        {
          renderPanels(props.children)
        }
      </GridLayout>
    )
  }

  const renderResponsiveGridBoard = () => {
    const layoutProps: ResponsiveGridBoardProps = Object.assign(DefaultGridResponsiveBoardProps, props)

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

  return props.useResponsive ? renderResponsiveGridBoard() : renderGridBoard()
}

export default GridBoard
