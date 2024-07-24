import React, { useEffect, useRef } from "react"

function useUpdateEffect(
  callback: React.EffectCallback,
  deps?: React.DependencyList,
) {
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(()=>{
    if(!isMounted.current) {
      isMounted.current = true
    } else {
      callback();
    }
  }, deps);
}

export default useUpdateEffect;
