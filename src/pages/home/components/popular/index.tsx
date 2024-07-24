import styles from './index.module.scss';
import { useRequest } from '@/hooks/useRequest';
import api from '../../api';
import { IHomeData } from '../../types';
import Loading from '@/components/loading';
import { ErrorBlock, Space, Card} from '@/bases';
import { useNavigate } from 'react-router-dom';
import { px2rem } from '@/utils/unit';
import BookCover from '@/components/book-cover';

export default function Popular() {
  const {data, isLoading, error} = useRequest<IHomeData>({url: api.getHomeData});
  const navigator = useNavigate();
  function renderContent() {
    if (isLoading)
      return <Loading></Loading>
    else if (error)
      return <ErrorBlock />
    return (
    <div className={styles.grid}>
      {data!.popular.map((book) => (
        <div
          key={book.bookId}
          className={styles['grid-item']}
          onClick={()=>navigator(`/book/${book.bookId}`)}
        >
          <Space gap={px2rem(12)}>
            <BookCover src={book.coverImg} alt={book.title} />
            <Space direction='vertical' justify='between' gap={px2rem(8)}>
              <div className={styles['book-title']}>{book.title}</div>
              <div className={styles['book-desc']}>{book.desc}</div>
              <div className={styles['book-meta']}>{book.author}·{book.categoryName}</div>
            </Space>
          </Space>

        </div>
      ))}
    </div>
    );
  }

  return (
    <Card
      title="热门精选"
      extra="更多"
      onClick={() => {
        navigator("/book-list/popular");
        }
      }
      headerClassName={styles.header}
    >
      {renderContent()}
    </Card>
  );
}
