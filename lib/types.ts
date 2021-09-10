import { CSSProperties, ReactElement } from 'react';
import { ReactGridLayoutProps, ResponsiveProps, WidthProviderProps, CoreProps } from 'react-grid-layout'

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

export interface GridBoardCommonProps extends CoreProps {
  useResponsive?: boolean
}

export interface GridBoardProps extends GridBoardCommonProps, ReactGridLayoutProps {}

export interface ResponsiveGridBoardProps extends GridBoardCommonProps, ResponsiveProps, WidthProviderProps {}
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
