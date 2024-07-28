import React, { CSSProperties, useRef } from "react";
import useItersectionObserver from "@/hooks/useIntersectionObserver";

export interface ImageProps {
  src: string;
  alt: string;
  width?: number|string;
  height?: number|string;
  fit?: 'contain' | 'cover' | 'fill' | 'scale-down';
  className?: string;
  style?: CSSProperties;

  loading?:string;
  lazy?: boolean;

  onClick?: (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  onError?: (e:React.SyntheticEvent<HTMLImageElement, MouseEvent>) => void;
  onLoad?: (e:React.SyntheticEvent<HTMLImageElement, MouseEvent>) => void;
}

function Image({
  src,
  alt = "",
  width = "100%",
  height = "100%",
  fit = "fill",
  className,
  style,
  lazy = false,
  loading = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8/x8AAqMB0Fk+W34AAAAASUVORK5CYII=",
  onClick,
  onError,
  onLoad,
}: ImageProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const observerEntry = useItersectionObserver(imgRef, {freezeOnceVisible: true});
  return (
    <img
      src={observerEntry?.isIntersecting || !lazy ? src : loading}
      alt={alt}
      // width={width}
      // height={height}
      className={className}
      style={{ ...style, width: width, height: height,  objectFit: fit }}
      onClick={onClick}
      onError={onError}
      onLoad={onLoad}
      draggable={false}
      ref={imgRef}
    />
  );
}

export default Image;
