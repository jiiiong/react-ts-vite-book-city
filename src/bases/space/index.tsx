import React, {Children, ReactNode} from "react";
import cx from 'classnames';
import './index.scss';

export interface SpaceProp {
  direction?: 'horizontal' | 'vertical',
  align?: 'start' | 'end' | 'center' | 'baseline',
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch',
  wrap?: boolean,
  block?: boolean,
  gap?: number | string | [number|string, number,string],
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  children?: ReactNode;
}

const cssPrefix = 'jiiiong-space';

function Space({
  direction="horizontal",
  align,
  justify,
  wrap=false,
  block=true,
  gap,
  onClick,
  children
}: SpaceProp) {

  function formatGap(gap: string | number) {
    if (typeof gap === 'number')
      return `${gap}px`;
    else
      return gap
  }

  function getGapStyle() {
    if (gap) {
      if (Array.isArray(gap)){
        const [gapV, gapH] = gap;
        return {
          '--gap-vertical': formatGap(gapV),
          '--gap-horizontal': formatGap(gapH),
        };
      }
      return {'--gap': formatGap(gap)};
    }
  }

  return (
    <div
      className={cx(
        cssPrefix,
        `${cssPrefix}-${direction}`,
        `${cssPrefix}-align-${align}`,
        `${cssPrefix}-justify-${justify}`,
        {
          [cssPrefix+'-block']: block,
          [cssPrefix+'-wrap']: wrap,
        }
      )}
      style={

        getGapStyle() as React.CSSProperties
      }
      onClick={onClick}
    >
      {Children.map(children, (child)=> {
        if (child !== undefined || child !== null)
          return <div className={cssPrefix+'-item'}>{child}</div>
      })}
    </div>
  );
}

export default Space;


