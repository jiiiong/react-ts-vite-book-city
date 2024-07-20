import React from "react";
import styles from './styles/swiper-item.module.scss';

export interface SwiperItemProps {
    children?: React.ReactNode,
}

const SwiperItem: React.FC<SwiperItemProps> = (
    {children}
) => {
    return (
        <div className={styles.block}>
            {children}
        </div>
    );
}

export default SwiperItem