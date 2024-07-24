import React from 'react';
import styles from './index.module.scss';
import { Image } from '@/bases';

export interface BookCoverProps {
  src: string;
  alt: string;
  style?: React.CSSProperties & Partial<Record<'--width'| '--heigh' | '--radius', string >>
}

export default function BookCover({
  src,
  alt,
}: BookCoverProps) {
  return (
    <div className={styles['book-cover']}>
      <Image src={src} alt={alt} lazy={true} />
    </div>
  );
}
