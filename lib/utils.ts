const COMPONENT_CLASSNAME = `grid-board`

export const ClassNames = {
  board: COMPONENT_CLASSNAME,
  layout: `${COMPONENT_CLASSNAME}-layout`,
  skeleton: `${COMPONENT_CLASSNAME}-skeleton`,
  progressiveExpand: `${COMPONENT_CLASSNAME}-progressive-expand`,
  panel: `${COMPONENT_CLASSNAME}-panel`,
  panelHeader: `${COMPONENT_CLASSNAME}-panel-header`,
  panelContent: `${COMPONENT_CLASSNAME}-panel-content`,
  panelFooter: `${COMPONENT_CLASSNAME}-panel-footer`,
  handler: `${COMPONENT_CLASSNAME}-handler`,
}

const COMPONENT_NAME = "@SEDS/GridBoard"

export const ComponentName = {
  component: COMPONENT_NAME,
  panel: `${COMPONENT_NAME}Panel`
}

export const isNullOrUndefined = (value:any) => value === null || value === undefined
