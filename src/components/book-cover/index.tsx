import React from 'react';
import styles from './index.module.scss';
import { Image } from '@/bases';

export interface BookCoverProps {
  src: string;
  alt: string;
  style?: React.CSSProperties & Partial<Record<'--width'| '--height' | '--radius', string >>
  editMode?: boolean;
  active?: boolean;
}

export default function BookCover({
  src,
  alt,
  style,
  editMode=false,
  active=false,
}: BookCoverProps) {
  return (
    <div className={styles["book-cover"]} style={{ ...style }}>
      <Image src={src} alt={alt} lazy={true} />
      {editMode && (
        <div className="absolute right-[3px] bottom-[3px] leading-none text-ygm-xl">
          {!active ? (
            <i className="icon-checkbox-unchecked text-ygm-weak" />
          ) : (
            <i className="icon-checkbox-checked text-ygm-primary"/>
          )}
        </div>
      )}
    </div>
  );
}
