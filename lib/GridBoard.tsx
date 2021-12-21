import React, { CSSProperties, ReactElement, ReactNode, useRef, useState } from 'react';
import GridLayout from 'react-grid-layout';
import PanelNode from './PanelNode';
import GridSkeleton from './GridSkeleton';
import { GridBoardProps, LayoutItem, PanelWrapperProps } from './types'
import { ClassNames, ComponentName, isNullOrUndefined } from './utils'

const calculateWidth = (containerPadding: number, colWidth: number, colMargin: number, cols: number):number => {
  return containerPadding * 2 + colWidth * cols + colMargin * (cols - 1);
}

const calculateHeight = (containerPadding: number, colWidth: number, colMargin: number, rows: number):number => {
  return containerPadding * 2 + colWidth * rows + colMargin * (rows - 1);
}

const calculateProgressiveView = (layoutItem: LayoutItem, layoutItems: LayoutItem[],  progressiveExpandConfig: [number, number]): [number, number] => {
  let maxX = progressiveExpandConfig[0], maxY = progressiveExpandConfig[1]
  layoutItems.forEach((item) => {
    if (item.x + item.w > maxX) {
      maxX = item.x + item.w
    }
    if (item.y + item.h > maxY) {
      maxY = item.y + item.h
    }
  })
  
  const { x, y, w, h } = layoutItem
  const newViewX = x + w > maxX ? x + w : maxX
  const newViewY = y + h > maxY ? y + h : maxY
  return [newViewX, newViewY]
}

const GridBoard: React.FC<GridBoardProps> = (props) => {

  const containerPadding = props.containerPadding as [number, number];
  const margin = props.margin as [number, number];
  const boardWidth = calculateWidth(containerPadding[0], props.colWidth as number, margin[0], props.cols);
  const boardHeight = props.autoSize ? 'auto' : calculateHeight(containerPadding[1], props.rowHeight as number, margin[1], props.rows)
  const progressiveExpandCols = useRef(props.progressiveExpand ? props.progressiveExpand[0] : props.cols)
  const progressiveExpandRows = useRef(props.progressiveExpand ? props.progressiveExpand[1] : props.rows)

  const gridBoardStyle = (progressiveExpand: [number, number]):CSSProperties | undefined => progressiveExpand ? {
      width: calculateWidth(containerPadding[0], props.colWidth as number, margin[0], progressiveExpand[0]),
      height: calculateHeight(containerPadding[1], props.rowHeight as number, margin[1], progressiveExpand[1])
    } as CSSProperties : undefined

  const [progressiveStyle, updateProgressStyle] = useState(gridBoardStyle(props.progressiveExpand as [number, number]));

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
    if (displayName !== ComponentName.panel) {
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

  const handleDrag = (layouts: LayoutItem[], oldItem: LayoutItem, newItem: LayoutItem, placeholder: LayoutItem, event: MouseEvent, element: HTMLElement): void => {
    console.log(oldItem, newItem, placeholder)
    if (props.progressiveExpand) {
      const [cols, rows] = calculateProgressiveView(newItem, layouts, props.progressiveExpand)
      progressiveExpandCols.current = cols > progressiveExpandCols.current ? cols : progressiveExpandCols.current
      progressiveExpandRows.current = rows > progressiveExpandRows.current ? rows : progressiveExpandRows.current
      const newProgressiveStyle = gridBoardStyle([progressiveExpandCols.current, progressiveExpandRows.current])
      if (newProgressiveStyle?.width !== progressiveStyle?.width || newProgressiveStyle?.height !== progressiveStyle?.height) {
        updateProgressStyle(newProgressiveStyle)
      }
    }

    if (props && typeof props.onDrag === 'function') {
      props.onDrag(layouts, oldItem, newItem, placeholder, event, element)
    }
  }

  const handleDragStop = (layouts: LayoutItem[], oldItem: LayoutItem, newItem: LayoutItem, placeholder: LayoutItem, event: MouseEvent, element: HTMLElement): void => {
    if (props.progressiveExpand) {
      const [cols, rows] = calculateProgressiveView(newItem, layouts, props.progressiveExpand)
      const newProgressiveStyle = gridBoardStyle([cols, rows])
      progressiveExpandCols.current = cols
      progressiveExpandRows.current = rows
      if (newProgressiveStyle?.width !== progressiveStyle?.width || newProgressiveStyle?.height !== progressiveStyle?.height) {
        updateProgressStyle(newProgressiveStyle)
      }
    }

    if (props && typeof props.onDragStop === 'function') {
      props.onDragStop(layouts, oldItem, newItem, placeholder, event, element)
    }
  }

  const handleLayoutChange = (layouts: LayoutItem[]): void => {
    if (props && typeof props.onLayoutChange === 'function') {
      props.onLayoutChange(layouts)
    }
  }

  const renderPanels = (children: ReactNode) => {
    return React.Children.map(children as ReactElement<PanelWrapperProps>, (child) => processItems(child))
  }

  const renderGridBoard = () => (
      <div
        className={`${ClassNames.board} ${props.className} ${props.progressiveExpand ? ClassNames.progressiveExpand : ''}`}
        style={progressiveStyle}
      >
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
          onDrag={handleDrag}
          onDragStop={handleDragStop}
          onLayoutChange={handleLayoutChange}
          style={{
            height: boardHeight
          }}
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
  progressiveExpand: [12, 12],
  draggableCancel: '',
  draggableHandle: '',
  compactType: null,
  autoSize: false,
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
