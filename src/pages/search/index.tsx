import  { useState } from 'react';
import BookSearchBar from './components/searchBar/searchBar';
import SearchList from './components/searchList/searchList';
import SearchHot from './components/searchHot/searchHot';
import { updateHistory } from './utils';
import { removeUrlParams, setUrlParams } from '@/utils/url';
import { useNavigate } from 'react-router-dom';
import SearchHistory from './components/searchHistory/searchHistory';
import parser from 'query-string';

function Search() {
  const defaultKeyword = parser.parse(window.location.search).keyword ;
  const [searchString, setSearchString] = useState(defaultKeyword as string || '');
  const navigate = useNavigate();

  const searchMode = searchString !== '';
  function handleSubmit(val: string) {
    // 更新历史搜索记录
    updateHistory(val);
    setUrlParams([["keyword", val]], "/search");
    setSearchString(val);
  }

  function handleChange(val: string) {
    if (val === '') {
      removeUrlParams(["keyword"], "/search");
      setSearchString('');
    }
  }

  function handleCancel() {
    removeUrlParams(["keyword"], "/search");
    setSearchString("");
  }

  return (
    <div className='p-ygm-m text-ygm-l flex flex-col gap-y-ygm-xl'>
      <BookSearchBar
        searchString={searchString}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onClear={handleCancel}
        onCancel={()=>{navigate(-1)}}
      />
      {searchMode
        ?
        <SearchList searchKeyword={searchString}/>
        :
        <>
          <SearchHot onItemClick={handleSubmit}/>
          <SearchHistory onItemClick={handleSubmit}/>
        </>
      }
    </div>
  );
}

export default Search;
