import React, { useEffect, useState } from 'react';
import { ClassNames } from './utils';
import { SkeletonBlockProps, GridSkeletonProps } from './types';

const skeletonClassName = ClassNames.skeleton;
const skeletonRowClassName = `${ClassNames.skeleton}-row`;
const skeletonBlockClassName = `${ClassNames.skeleton}-block`;

const Block: React.FC<SkeletonBlockProps> = ({ className = '', style }) => <div className={`${skeletonBlockClassName} ${className}`} style={style}></div>

const GridSkeleton: React.FC<GridSkeletonProps> = (props) => {
  const { cols = 0, rows = 0, padding: [paddingX, paddingY]} = props;

  const [row, updateRow] = useState(Array(rows).fill(0));
  const [col, updateCol] = useState(Array(cols).fill(0));

  useEffect(() => {
    if(props.rows !== row.length) {
      updateRow(Array(props.rows))
    }
    if (props.cols !== col.length) {
      updateCol(Array(props.cols))
    }
  }, [props])

  return (
    <div className={`${props.className || ''} ${skeletonClassName}`} style={{padding: `${paddingY}px ${paddingX}px`}}>
      {
        row.map((r, rIndex) => <div className={skeletonRowClassName} key={`${rIndex}`}>
          {
            col.map((c, cIndex) => <Block key={`${rIndex}-${cIndex}`} />)
          }
        </div>
        )
      }
       {props.children}
    </div>
  )
}

export default GridSkeleton;