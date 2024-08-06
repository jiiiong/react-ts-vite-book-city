import { CSSProperties } from "react";
import cx from 'classnames';
export interface DialogButtonProps {
  key: string,
  text: string,
  type?: 'normal'| 'primary'| 'error'
  onClick?: (key: string) => void,
  disabled?: boolean
  style?: CSSProperties,
}

export function DialogButton({
  key,
  text,
  type='normal',
  onClick,
  disabled = false,
  style,
}:DialogButtonProps) {
  return (
    <div
      className={cx(
        `
        p-ygm-s
        flex items-center justify-center
        `,
        {
          'text-ygm-primary': type ==='primary',
          'text-ygm-danger': type === 'error',
        }
      )}

      style={{...style}}
      onClick={()=>{!disabled && onClick?.(key)}}
    >
      {text}
    </div>
  );
}
