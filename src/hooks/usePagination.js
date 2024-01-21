import { useEffect, useState } from "react";

const usePagination = (limit = 5, defaultOffset = 0, getDataCallback) => {
  const [offset, setOffset] = useState(defaultOffset);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const fetchNewData = async () => {
    if (offset > data.length) {
      return;
    }
    const newData = await getDataCallback(limit, offset);
    console.log("fetchedNewData");
    setData((prev) => [...prev, ...newData]);
    setOffset((prev) => prev + limit);
  };

  const fetchInitialData = async () => {
    if (data.length > 0) {
      return;
    }
    if (offset > data.length) {
      return;
    }

    setLoading(true);
    const newData = await getDataCallback(limit, defaultOffset);
    setData(newData);
    setOffset(defaultOffset + limit);
    setLoading(false);
  };

  const refreshData = async () => {
    setLoading(true);
    const newData = await getDataCallback(limit, defaultOffset);
    setData(newData);
    setOffset(defaultOffset + limit);
    setLoading(false);
  };
  return [data, fetchNewData, loading, refreshData, fetchInitialData];
};

export default usePagination;
