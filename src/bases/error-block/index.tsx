import React from "react";
import ErrorImage from "./errorImage";
import styles from './index.module.scss';

export interface ErrorBlockProps {
    title?: React.ReactNode,
    description?: React.ReactNode,
    image?: React.ReactNode,
}

const ErrorBlock: React.FC<ErrorBlockProps> = 
({title='页面遇到一些小问题', description='请稍后重试', image}) => {
    let imageNode: React.ReactNode = ErrorImage;
    if (image)
        imageNode = image
    return (
        <div className={styles.block}>
            <div className={styles.image}>{imageNode}</div>
            <div className={styles.description}>
                <div className={styles.title}>{title}</div>
                <div className={styles['sub-title']}>{description}</div>
            </div>
        </div>
    );
}

export default ErrorBlock;
