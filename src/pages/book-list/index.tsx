import NavBar from "@/bases/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { IBookListData, TPageKey } from "./types";
import { TITLE_KEY_MAP } from "./constants";
import { px2rem } from "@/utils/unit";
import useInfiniteRequest from "@/hooks/useRequest/useInfiniteRequest";
import api from "./api";
import { ErrorBlock, Space} from "@/bases";
import BookCover from "@/components/book-cover";
import Loading from "@/components/loading";
import InfiniteLoading from "@/bases/infinit-loading/InfiniteLoading";


function BookList() {
  const navigate = useNavigate();
  // 当前路由
  const pageKey = useParams().key as TPageKey;
  const { data, isLoading, error, isValidating, size, setSize } =
    useInfiniteRequest<IBookListData>({ url: api.getBookList(pageKey)}, {revalidateFirstPage: false});

  if (error || !TITLE_KEY_MAP[pageKey])
    return <ErrorBlock />
  if (isLoading)
    return <Loading />

  function hasMore(): boolean {
    return !(data?.slice(-1)[0].isLast)
  }

  async function loadMore() {
    if (isValidating) // 上一轮还没加载完
      return
    await setSize(size+1)
  }


  return (
    // viweport
    <div className="h-screen flex flex-col">
      {/** nav bar */}
      <NavBar onBack={() => navigate(-1)} style={{ minHeight: px2rem(45) }}>
        <div className="text-center">{TITLE_KEY_MAP[pageKey]}</div>
      </NavBar>
      {/**content */}
      <div className="overflow-y-auto">
        <InfiniteLoading hasMore={hasMore()} loadMore={loadMore}>
          <div
            className="
            px-ygm-m py-ygm-s overflow-y-auto
            flex flex-col gap-y-ygm-l
          "
          >
            {data?.map((page) =>
              page.bookList.map((book) => (
                <div
                  key={book.bookId}
                  className=""
                  onClick={() => navigate(`/book/${book.bookId}`)}
                >
                  <Space gap={px2rem(12)}>
                    <BookCover src={book.coverImg} alt={book.title} />
                    <Space direction="vertical" gap={px2rem(8)}>
                      <div className="text-ygm-l line-clamp-1">{book.title}</div>
                      <div className="leading-[18px] line-clamp-2 text-ygm-m text-ygm-weak">
                        {book.desc}
                      </div>
                      <div className="text-ygm-s text-ygm-weak">
                        {book.author}·{book.categoryName}
                      </div>
                    </Space>
                  </Space>
                </div>
              )),
            )}
          </div>
        </InfiniteLoading>
      </div>
    </div>
  );
}

export default BookList;
