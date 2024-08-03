import NavBar from "@/bases/NavBar";
import { useRequest } from "@/hooks/useRequest";
import { api } from "@/pages/detail/api";
import { IBookInfo } from "@/types/book";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function DetailNavbar() {
  // hooks
  const navigate = useNavigate()
  const bookId = useParams().id as string
  const {data} = useRequest<IBookInfo>({url: api.getBook(bookId)})
  const [fix, setFix] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    function handleScroll() {
      if (document.body.scrollTop> navRef.current!.offsetHeight)
        setFix(true)
      else
        setFix(false)
    }

    window.addEventListener('scroll', handleScroll, true);
    return ()=> window.removeEventListener('scroll', handleScroll, true);
  },[]);

  return (
    <div
      className="
        fixed top-[0] left-[0] right-[0]
      "
      ref={navRef}
    >
      <NavBar
        onBack={()=>{navigate(-1);}}
        style={{background: fix ? `#fff` : `inherit`}}>
        <div className="text-center">{fix ? data?.title : ''}</div>
      </NavBar>
    </div>
  );
}
