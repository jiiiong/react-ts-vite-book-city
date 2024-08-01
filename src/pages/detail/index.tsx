import { useRequest } from "@/hooks/useRequest";
import { api } from "./api";
import { useParams } from "react-router-dom";
import { ErrorBlock } from "@/bases";
import Loading from "@/components/loading";
import { DetaiHeader } from "./components/DetaiHeader";
import { DetailContent } from "./components/DetailContent";
import { DetailFooter } from "./components/DetailFooter";

function Detail() {
  const bookId = useParams().id as string
  const {isLoading, error} = useRequest({url: api.getBook(bookId)})

  if (error)
    return <ErrorBlock />
  if (isLoading)
    return <Loading />

  return (
    <div className="h-[999px]">
      <DetaiHeader />
      <DetailContent />
      <DetailFooter />
    </div>
  );
}

export default Detail;
