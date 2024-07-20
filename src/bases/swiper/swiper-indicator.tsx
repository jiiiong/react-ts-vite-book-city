import cx from 'classnames';
import styles from './styles/swiper-indicator.module.scss';

export interface SwiperPageIndicatorProps {
  currentIndex: number,
  total: number,

}

function SwiperPageIndicator(
  {currentIndex, total}: SwiperPageIndicatorProps
) {
  const curIndex = Math.min(total-1 ,Math.max(0, Math.floor(currentIndex)));
  const dots = Array(total).fill(0).map((_, index)=>(
    <div key={index}
      className={cx(styles.dot, {[styles.active]: index===curIndex})}>
    </div>
  ))

  return (
    <div className={styles['swiper-indicator']}>{dots}</div>
  );
}

export default SwiperPageIndicator;
