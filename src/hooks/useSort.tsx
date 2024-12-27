import {useMemo, useState} from "react";

const useSort = (data: any[]) => {
  const [sortAscending, setSortAscending] = useState(true);

  const sortedData = useMemo(() => {
    const sortedArray = [...data].sort((a, b) => {
      const dateA = new Date(a.date).valueOf();
      const dateB = new Date(b.date).valueOf();

      if (sortAscending) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    return sortedArray;
  }, [data, sortAscending]);

  const toggleSort = () => {
    setSortAscending(!sortAscending);
  };

  return {toggleSort, sortedData, sortAscending};
};

export default useSort;
