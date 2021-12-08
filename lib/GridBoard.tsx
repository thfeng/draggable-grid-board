import React, { ReactElement, ReactNode, useEffect, useRef, useState } from 'react'
import GridLayout from 'react-grid-layout'
import PanelNode from './PanelNode'
import GridSkeleton from './GridSkeleton';
import { GridBoardProps, PanelWrapperProps } from './types'
import { ClassNames, CompnentName, isNullOrUndefined } from './utils'

const GridBoard: React.FC<GridBoardProps> = (props) => {
  const width = (props.containerPadding as [number, number])[0] * 2 + (props.colWidth as number + (props.margin as [number, number])[0]) * props.cols;
  console.log(width)
  const [boardWidth] = useState(width);
  
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

  const renderGridBoard = () => (
      <div className={`${ClassNames.board} ${props.className}`}>
        {
          props.showSkeleton &&
            <GridSkeleton
              className={`${props.skeletonClassName}`}
              cols={props.cols}
              rows={props.rows}
              padding={props.containerPadding || [10, 10]}
            />
        }
        <GridLayout
          {...props}
          width={boardWidth}
          className={`${ClassNames.layout}`}
          >
          {
            renderPanels(props.children)
          }
        </GridLayout>
      </div>
    )

  return renderGridBoard()
}

GridBoard.defaultProps = {
  className: '',
  cols: 12,
  rows: 12,
  rowHeight: 72,
  colWidth: 112,
  draggableCancel: '',
  draggableHandle: '',
  compactType: 'vertical',
  autoSize: true,
  margin: [24, 24],
  containerPadding: [12, 12],
  isDraggable: true,
  isResizable: true,
  isBounded: true,
  isDroppable: false,
  preventCollision: false,
  resizeHandles: ['se'],
  resizeHandle: undefined,
  skeletonClassName: '',
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
  onLayoutChange: () => {}
}

export default GridBoard
