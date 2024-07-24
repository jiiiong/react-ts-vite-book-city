import React, { ReactNode } from 'react';
import './index.scss';
const cardClassPrefix = 'jiiiong-card';
import cx from 'classnames';

export interface CardProps {
  title?: ReactNode;
  extra?: string;
  headerClassName?: string;
  titleClassName?: string;
  extraClassName?: string;
  bodyClassName?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children?: ReactNode;
}

export default function Card({
  title,
  extra,
  headerClassName,
  titleClassName,
  extraClassName,
  bodyClassName,
  onClick,
  children,
}: CardProps) {
  return (
    <div className={cardClassPrefix}>
      <div className={cardClassPrefix+'-header'  + ' ' + headerClassName} >
        <div className={cx(cardClassPrefix+'-header-title', titleClassName)}>{title}</div>
        <div className={cx(cardClassPrefix+'-header-extra', extraClassName)} onClick={onClick}>{extra}</div>
      </div>
      <div className={cx(cardClassPrefix+'-body', bodyClassName)}>
        {children}
      </div>
    </div>
  );
}
