import { CSSProperties, ReactElement } from 'react';
import { Layout, ItemCallback } from 'react-grid-layout'

export type LayoutItem = {
  w: number,
  h: number,
  x: number,
  y: number,
  i: string,
  minW?: number,
  minH?: number,
  maxW?: number,
  maxH?: number,
  moved?: boolean,
  static?: boolean,
  isDraggable?: boolean,
  isResizable?: boolean,
  resizeHandles?: Array<"s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne">,
  isBounded?: boolean
}

export type ResizeHandleAxis = | "s"| "w"| "e"| "n"| "sw"| "nw"| "se"| "ne";

export type ReactRef<T> = {
  current: T | null
}

export interface GridBoardProps {
  //
  // Basic props
  //

  className: string,

  breakpoints: {
    lg: number,
    md: number,
    sm: number,
    xs: number,
    xxs: number,
  },

  // Number of columns in this layout.
  cols: {
    lg: number,
    md: number,
    sm: number,
    xs: number,
    xxs: number,
  },

  // A CSS selector for tags that will not be draggable.
  // For example: draggableCancel:'.MyNonDraggableAreaClassName'
  // If you forget the leading . it will not work.
  // .react-resizable-handle" is always prepended to this value.
  draggableCancel: string,

  // A CSS selector for tags that will act as the draggable handle.
  // For example: draggableHandle:'.MyDragHandleClassName'
  // If you forget the leading . it will not work.
  draggableHandle: string,

  // Compaction type.
  compactType: "vertical" | "horizontal";

  // Margin between items [x, y] in px.
  margin: [number, number],

  // Padding inside the container [x, y] in px
  containerPadding: [number, number],

  // Rows have a static height, but you can change this based on breakpoints
  // if you like.
  rowHeight: number,

  //
  // Flags
  //
  isDraggable: boolean,
  isResizable: boolean,
  isBounded: boolean,

  // If true, grid items won't change position when being
  // dragged over.
  preventCollision: boolean,

  // If true, droppable elements (with `draggable={true}` attribute)
  // can be dropped on the grid. It triggers "onDrop" callback
  // with position and event object as parameters.
  // It can be useful for dropping an element in a specific position
  //
  // NOTE: In case of using Firefox you should add
  // `onDragStart={e => e.dataTransfer.setData('text/plain', '')}` attribute
  // along with `draggable={true}` otherwise this feature will work incorrect.
  // onDragStart attribute is required for Firefox for a dragging initialization
  // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
  isDroppable: boolean,
  // Defines which resize handles should be rendered
  // Allows for any combination of:
  // 's' - South handle (bottom-center)
  // 'w' - West handle (left-center)
  // 'e' - East handle (right-center)
  // 'n' - North handle (top-center)
  // 'sw' - Southwest handle (bottom-left)
  // 'nw' - Northwest handle (top-left)
  // 'se' - Southeast handle (bottom-right)
  // 'ne' - Northeast handle (top-right)
  resizeHandles: Array<'s' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne'>,
  // Custom component for resize handles
  // See `handle` as used in https://github.com/react-grid-layout/react-resizable#resize-handle
  // Your component should have the class `.react-resizable-handle`, or you should add your custom
  // class to the `draggableCancel` prop.
  resizeHandle?: ReactElement<any> | ((resizeHandleAxis: ResizeHandleAxis, ref: ReactRef<HTMLElement>) => ReactElement<any>),

  //
  // Callbacks
  //

  // Callback so you can save the layout.
  // Calls back with (currentLayout) after every drag or resize stop.
  onLayoutChange: (layout: Layout) => void,

  //
  // All callbacks below have signature (layout, oldItem, newItem, placeholder, e, element).
  // 'start' and 'stop' callbacks pass `undefined` for 'placeholder'.
  //

  // Calls when drag starts.
  onDragStart: ItemCallback,
  // Calls on each drag movement.
  onDrag: ItemCallback,
  // Calls when drag is complete.
  onDragStop: ItemCallback,
  // Calls when resize starts.
  onResizeStart: ItemCallback,
  // Calls when resize movement happens.
  onResize: ItemCallback,
  // Calls when resize is complete.
  onResizeStop: ItemCallback,

  //
  // Dropover functionality
  //

  // Calls when an element has been dropped into the grid from outside.
  onDrop: (layout: Layout, item: LayoutItem, e: Event) => void

  // Ref for getting a reference for the grid's wrapping div.
  // You can use this instead of a regular ref and the deprecated `ReactDOM.findDOMNode()`` function.
  innerRef: React.Ref<"div">
}

export interface PanelProps {
  className?: string
  style?: CSSProperties
  // key: string
  // posX: number
  // posY: number
  // width: number
  // height: number
  header?: string | ReactElement
  footer?: string | ReactElement
}

export interface PanelHeaderProps {
  className?: string
}

export interface PanelFooterProps {
  className?: string
}
