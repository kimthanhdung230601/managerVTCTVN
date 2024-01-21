import { useState, useEffect } from 'react';

function useDebounce(value:any, delay:any) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Thiết lập một timeout để đợi cho đến khi không có sự kiện xảy ra trong khoảng thời gian delay
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Hủy bỏ timeout nếu giá trị thay đổi trước khi timeout kết thúc
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
