import { useEffect, useRef, useState } from "react";

export interface SearchBarProps {
  searchString: string,
  onSubmit?: (val: string) => void,
  onChange?: (val: string) => void,
  onCancel?: () => void
  onClear?: () => void;
}

export default function BookSearchBar(props: SearchBarProps) {
  return  <InnerBookSearchBar key={props.searchString} {...props}/>;
}

function InnerBookSearchBar({
  searchString,
  onSubmit,
  onChange,
  onCancel,
  onClear,
}: SearchBarProps) {


  // 聚焦 input
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(()=>{searchRef.current?.focus();},[]);

  const [inputValue, setInputValue] = useState(searchString);

  return (
    // search bar
    <form className="flex items-center justify-between" onSubmit={(e)=>{
      e.preventDefault();
      if (onSubmit) onSubmit(inputValue);
      }}>
      <div className="flex-grow rounded-ygm-m bg-ygm-box flex overflow-hidden">
        <i className="block icon-search text-ygm-weak p-ygm-s"></i>
        <input
          name="seach input"
          className="w-full bg-inherit focus:outline-none"
          type="text"
          placeholder="搜索作者、作者"
          ref={searchRef}
          value={inputValue}
          onChange={(e)=>
            {
              const val = e.target.value;
              setInputValue(val);
              if (onChange) onChange(val);
            }}
          // on
        />
        {searchString !== "" && (
          <i
            className="icon-cross inline-block text-ygm-weak p-ygm-s"
            onClick={() =>{
              setInputValue('');
              if (onClear) onClear();
            }}
          ></i>
        )}
      </div>
      <div
        className="pl-ygm-m"
        onClick={onCancel}
      >
        取消
      </div>
    </form>
  );
}
