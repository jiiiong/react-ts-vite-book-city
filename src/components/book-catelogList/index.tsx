import { Space } from "@/bases";
import BookCover from "../book-cover";
import { px2rem } from "@/utils/unit";

export interface BookCatelogListProps {
  catelogList: string[];
  imgUrl: string;
  title: string;
  author: string;
  bookId: string;
  onClickChapter?: (index: number)=>void;
}

export function BookCatelogList(
  {
    catelogList,
    imgUrl,
    title,
    author,
    onClickChapter,
  }: BookCatelogListProps
) {
  return (
   // box
   <div
     className="
      py-ygm-l
      h-screen w-[80vw] bg-[#222]
      text-ygm-m text-ygm-white
      flex flex-col
    "
   >
     {/** header */}
     <div
      className="
        p-ygm-l
      "
     >
       <Space gap={px2rem(16)}>
         <BookCover src={imgUrl} alt={title}></BookCover>
         <div >
            <div className="mt-ygm-m mb-ygm-l text-ygm-l">{title}</div>
            <div className="text-ygm-weak">{author}</div>
         </div>
       </Space>
     </div>

     {/** catelogs */}
     <div className="flex-1 overflow-y-auto">
        {catelogList.map((item, index)=>(
          <div
            key={item}
            className="
              px-ygm-l
              leading-[50px]
              text-ygm-m
              line-clamp-1
            "
            onClick={()=>onClickChapter?.(index)}
          >
            {item}
          </div>
        ))}
     </div>
   </div>
 );
}
