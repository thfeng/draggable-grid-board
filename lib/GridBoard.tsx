import React, { ReactElement, ReactNode, useEffect, useRef, useState } from 'react'
import GridLayout from 'react-grid-layout'
import PanelNode from './PanelNode'
import GridSkeleton from './GridSkeleton';
import { GridBoardProps, PanelWrapperProps } from './types'
import { ClassNames, CompnentName, isNullOrUndefined } from './utils'

const DefaultGridBoardProps: GridBoardProps = {
  className: '',
  cols: 12,
  rows: 12,
  draggableCancel: '',
  draggableHandle: '',
  compactType: 'vertical',
  autoSize: true,
  rowHeight: 150,
  margin: [10, 10],
  containerPadding: [10, 10],
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
  onLayoutChange: () => {}
}

const DefaultGridBoardState: GridBoardState = {
  width: 1200
}

const GridBoard: React.FC<GridBoardProps> = (props) => {

  const gridBoardRef = useRef<HTMLDivElement>();
  const [width, setWidth] = useState(DefaultGridBoardState.width);

  useEffect(() => {
    if (gridBoardRef.current) {
      console.log(gridBoardRef.current)
      setWidth(gridBoardRef.current.scrollWidth)
    }
  }, [gridBoardRef])
  
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
      <div className={`${ClassNames.board} ${layoutProps.className}`} ref={gridBoardRef}>
        {
          layoutProps.showSkeleton && <GridSkeleton className={`${layoutProps.skeletonClassName}`} cols={layoutProps.cols} rows={layoutProps.rows} />
        }
        <GridLayout
          {...layoutProps}
          width={width}
          className={`${ClassNames.layout}`}
          >
          {
            renderPanels(props.children)
          }
        </GridLayout>
      </div>
    )
  }

  return renderGridBoard()
}

export default GridBoard
