// 创建useDebounce自定义HOOK
import { useState, useEffect } from 'react'

// 防抖hook
const useDebounce = (value: any, delay = 300) => {

  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {// 延时更新函数
    const handler = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler);
    }
  }, [value, delay])

  return debouncedValue;
}

export default useDebounce
