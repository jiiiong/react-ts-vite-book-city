import React from 'react';
import {Link} from 'react-router-dom';
import styles from './index.module.scss';

const Header: React.FC = () => {
    return (
        <div className={styles.header}>
            <div className={styles.left}>
                <h1>书城</h1>
            </div>
            <div className={styles.right}>
                <Link to="/search">
                    <i className="icon-search" aria-label="搜索"></i>
                </Link>
                <Link to="/shelf">
                    <i className="icon-books" aria-label="书架"></i>
                </Link>
            </div>
        </div>
    )
}

export default Header