import { useRequest } from "@/hooks/useRequest";
import { ICategory } from "./types";
import api from "./api";
import { ErrorBlock, Space } from "@/bases";
import Loading from "@/components/loading";
import NavBar from "@/bases/NavBar";
import { useNavigate } from "react-router-dom";
import { px2rem } from "@/utils/unit";
import BookCover from "@/components/book-cover";

function Category() {
  const {data, isLoading, error} = useRequest<ICategory[]>({url: api.category})
  const navigate = useNavigate()
  if (error)
    return <ErrorBlock />
  if (isLoading)
    return <Loading />

  return (
    /** viewport */
    <div className="h-screen flex flex-col">
      {/**nav bar 将 NavBar wrap 到一个 div 中，如此这个 div 的 min-content
       * 大小就是 NavBar 的大小；分配到固定值
      */}
      <div className="">
        <NavBar
          onBack={() => navigate(-1)}
        >
          <div className="text-center">分类</div>
        </NavBar>
      </div>
      {/** content */}
      <div
        className="
          px-ygm-l py-ygm-m
          overflow-x-hidden overflow-y-auto
          grid grid-cols-2 gap-ygm-l
        ">
          {/** items */}
          {data!.map((item) => {
            return (
              /** item */
              <div
                key={item.id}
                className="
                h-[75] p-ygm-m bg-ygm-box rounded-ygm-s
                "
                onClick={() => {
                  navigate(`/book-list/${item.id}`);
                }}
              >
                <Space gap={px2rem(12)}>
                  <BookCover
                    src={item.bookCover}
                    alt={item.name}
                    style={{
                      '--height': px2rem(51),
                      "--width":px2rem(40),
                    }}
                  />
                  <Space direction="vertical">
                    {/** name */}
                    <div className="text-ygm-m">{item.name}</div>
                    {/** count */}
                    <div className="text-ygm-s text-ygm-weak">
                      {item.bookCount}
                    </div>
                  </Space>
                </Space>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Category;
