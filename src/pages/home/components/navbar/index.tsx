import styles from './index.module.scss';
import {Link} from 'react-router-dom';
import catagory from '@/assets/images/category.png';
import rank from '@/assets/images/rank.png';
import finish from '@/assets/images/finish.png';
import recommend from '@/assets/images/recommend.png';

function NavBar(){
  return (
    <div className={styles["nav-bar"]}>
      <div className={styles["nav-bar-item"]}>
        <Link to={"/ranking"} className={styles.icon}>
          <img src={rank} alt="rank" />
        </Link>
        <h3>排行</h3>
      </div>
      <div className={styles["nav-bar-item"]}>
        <Link to={"/category"} className={styles.icon}>
          <img src={catagory} alt="catagory" />
        </Link>
        <h3>目录</h3>
      </div>
      <div className={styles["nav-bar-item"]}>
        <Link to={"/book-list/finish"} className={styles.icon}>
          <img src={finish} alt="finish" />
        </Link>
        <h3>完本</h3>
      </div>
      <div className={styles["nav-bar-item"]}>
        <Link to={"/book-list/recommend"} className={styles.icon}>
          <img src={recommend} alt="recommend" />
        </Link>
        <h3>推荐</h3>
      </div>
    </div>
  );
}

export default NavBar
