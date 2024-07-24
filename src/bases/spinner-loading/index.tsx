import React from "react";
import styles from './index.module.scss';
import cx from "classnames";

export interface SpinnerLoadingProps {
    color?: 'defualt' | 'primary' | 'white',
    size?: number,
    style?: React.CSSProperties,
}

const SpinnerLoading: React.FC<SpinnerLoadingProps> =
({color='defualt', size = 32, style}) => {
  return (
    <div
      className={cx(
        styles['spinner-loading'],
        styles[`color-${color}`],
      )}
      style={{...style, width: size, height: size }}
    ></div>
  );
};

export default SpinnerLoading;
