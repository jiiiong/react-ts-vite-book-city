import { Card } from "@/bases";
import styles from './index.module.scss';
import api from '../../api';
import { useNavigate } from "react-router-dom";
import { useRequest } from "@/hooks/useRequest";
import {Space} from "@/bases";
import { IHomeData } from "../../types";
import BookCover from "@/components/book-cover";
import { px2rem } from "@/utils/unit";
import Loading from "@/components/loading";

export default function Recommond() {
  const navigate = useNavigate();
  const {data, isLoading} = useRequest<IHomeData>({url: api.getHomeData})

  function renderBody() {
    if (isLoading)
      return <Loading />
    return (
      <div className={styles.grid}>
        {data!.recommend.map((book) => (
          <div
            key={book.bookId}
            onClick={()=>navigate(`/book-list/${book.bookId}`)}
          >
            <BookCover src={book.coverImg} alt={book.title} />
            <Space
              direction="vertical"
              // align="center"s
              gap={px2rem(6)}
            >
              <div className={styles["book-title"]}>{book.title}</div>
              <div className={styles["book-author"]}>{book.author}</div>
            </Space>
          </div>
        ))}
      </div>
    );
  }
  return (
    <Card
      title='今日推荐'
      extra='更多'
      headerClassName={styles.header}
      onClick={()=>navigate('/book-list/recommend')}
    >
      {renderBody()}
    </Card>
  );
}
