import { CSSProperties, ReactElement } from 'react';
import { ReactGridLayoutProps, CoreProps } from 'react-grid-layout'

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

export interface GridBoardProps extends CoreProps, ReactGridLayoutProps {
  className?: string
  style?: CSSProperties
  skeletonClassName?: string
  showSkeleton?: boolean
  rows: number
  cols: number
  colWidth?: number
}

export interface PanelWrapperProps extends PanelProps {
  posX: number
  posY: number
  width: number
  height: number
  minHeight?: number,
  minWidth?: number,
  isDraggable?: boolean,
  isResizable?: boolean,
}

export interface GridSkeletonProps {
  className?: string
  style?: CSSProperties
  cols: number
  rows: number
  padding: [number, number]
}

export interface SkeletonBlockProps {
  className?: string
  style?: CSSProperties
}

export interface PanelProps {
  className?: string
  style?: CSSProperties
  header?: string | ReactElement
  footer?: string | ReactElement
}

export interface PanelHeaderProps {
  className?: string
}

export interface PanelFooterProps {
  className?: string
}
