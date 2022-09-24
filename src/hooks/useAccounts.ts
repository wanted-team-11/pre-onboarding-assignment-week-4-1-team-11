import { useEffect, useState } from "react";
import { fetchAccountsByPageNumber } from "../services/api/accountApi";
import { fetchUserByUserId } from "../services/api/userApi";
import { FilteredAccounts } from "../types";
import { useLocation } from "react-router-dom";

function useAccounts() {
  const [totalCount, setTotalCount] = useState(0);
  const location = useLocation();
  const { search } = location;
  const [page, setPage] = useState(
    Number(new URLSearchParams(search).get("page"))
  );

  useEffect(() => {
    const pageNum = Number(new URLSearchParams(search).get("page"));
    setPage(pageNum);
  }, [search]);

  const [accounts, setAccounts] = useState<FilteredAccounts[]>([]);

  const getAccounts = async () => {
    try {
      const response = await fetchAccountsByPageNumber(page);
      const xTotalCount = Number(response.headers["x-total-count"]);
      setTotalCount(xTotalCount);
      for (let i = 0; i < response.data.length; i++) {
        await fetchUserByUserId(response.data[i].user_id)
          .then((res) => {
            response.data[i].user_name = res.data[0].name;
          })
          .catch((err) => {
            console.error(err);
          });
      }
      setAccounts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAccounts();
  }, [page]);

  return { totalCount, accounts };
}

export default useAccounts;
