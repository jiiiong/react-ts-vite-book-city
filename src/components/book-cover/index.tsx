import React from 'react';
import styles from './index.module.scss';
import { Image } from '@/bases';

export interface BookCoverProps {
  src: string;
  alt: string;
  style?: React.CSSProperties & Partial<Record<'--width'| '--height' | '--radius', string >>
}

export default function BookCover({
  src,
  alt,
  style,
}: BookCoverProps) {
  return (
    <div className={styles['book-cover']} style={{...style}}>
      <Image src={src} alt={alt} lazy={true} />
    </div>
  );
}
