// state 存储读取的 local storage
// 当 local storage 发生变化时，更新 state

import { useCallback, useSyncExternalStore } from "react";

function useReadLocalStorage<D=unknown>(key: string): D | null {

  const subscribe = useCallback((callback: () => void) => {
    const handleStoreChange = (e: Event)=>{
      if ((e as CustomEvent).detail.key && (e as CustomEvent).detail.key !== key){
        return
      }
      callback()
    }
    window.addEventListener('localStorage-update', handleStoreChange)
    return () => (window.removeEventListener('localStorage-update', handleStoreChange));
  }, [key])

  // 从 local storage 读取关键字为 key 的数据
  const readVal = useCallback(() => {
    try {
      const tmp = window.localStorage.getItem(key);
      return tmp;
    } catch(err) {
      console.warn(`读取 localStorage 失败 ${err}`)
      return null
    }
  }, [key]);

  const raw_data = useSyncExternalStore(
    subscribe,
    readVal,
  );

  return  raw_data ? (JSON.parse(raw_data) as D) : null;

}

export {useReadLocalStorage};
