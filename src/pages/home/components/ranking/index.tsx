import { Card } from "@/bases";
import styles from './index.module.scss';
import api from '../../api';
import { useNavigate } from "react-router-dom";
import { useRequest } from "@/hooks/useRequest";
import {Space, Tabs} from "@/bases";
import { IHomeData, IRanking } from "../../types";
import BookCover from "@/components/book-cover";
import { px2rem } from "@/utils/unit";
import Loading from "@/components/loading";

export default function Ranking() {
  const navigate = useNavigate();
  const {data, isLoading} = useRequest<IHomeData>({url: api.getHomeData})

  function renderTab(rank: IRanking) {
    return (
      <div className={styles.grid}>
        {rank.books.map((book) => (
          <div
            key={book.bookId}
            onClick={() => navigate(`/book-list/${book.bookId}`)}
          >
            <Space
              gap={px2rem(6)}
            >
              <BookCover
                src={book.coverImg}
                alt={book.title}
                style={{ "--width": px2rem(47), '--height':px2rem(66)}}
              />
              <div>
                <div className={styles["book-title"]}>{book.title}</div>
                <div className={styles["book-author"]}>{book.author}</div>
              </div>
            </Space>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Card
      title='排行榜'
      extra="更多"
      headerClassName={styles.header}
      onClick={()=>navigate('/ranking')}
    >
      {isLoading ?
        <Loading /> :
        <Tabs
          activeKey={`1`}
          type="card"
          showTabLine={false}
          tabListClassName={styles.tabList}
          tabActiveClassName={styles.tabActive}
          tabContentClassName={styles.tabContent}
        >
          {data!.ranking.map((rank, index) => (
            <Tabs.Tab key={`${index+1}`} title={rank.title}>
              {renderTab(rank)}
            </Tabs.Tab>
          ))}
        </Tabs>
      }
    </Card>
  );
}
