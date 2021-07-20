const CLASS_PREFIX = 'se-ds'
const COMPONENT_CLASSNAME = `${CLASS_PREFIX}-draggable-grid-board`

export const ClassNames = {
  board: COMPONENT_CLASSNAME,
  panel: `${COMPONENT_CLASSNAME}-panel`,
  panelHeader: `${COMPONENT_CLASSNAME}-panel-header`,
  panelContent: `${COMPONENT_CLASSNAME}-panel-content`,
  panelFooter: `${COMPONENT_CLASSNAME}-panel-footer`,
  draggableHandle: `${CLASS_PREFIX}-draggable-handler`,
}

const COMPONENT_NAME = "@SEDS/DraggableGridBoard"

export const CompnentName = {
  component: COMPONENT_NAME,
  panel: `${COMPONENT_NAME}Panel`
}

export const isNullOrUndefined = value => value === null || value === undefined
