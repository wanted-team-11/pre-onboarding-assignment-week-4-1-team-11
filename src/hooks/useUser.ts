import { useEffect, useState } from "react";
import {
  fetchUserByPageNumber,
  fetchUserByUuid,
  fetchUser,
} from "../services/api/userApi";
import { fetchAccountsByUserId } from "../services/api/accountApi";
import { FilteredUser } from "../types";
import { useLocation } from "react-router-dom";

const useUser = () => {
  const [user, setUser] = useState<FilteredUser[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const location = useLocation();
  const { search } = location;
  const [page, setPage] = useState(Number(search.split("=")[1]));

  useEffect(() => {
    fetchUser()
      .then((res) => {
        setTotalCount(res.data.length);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page]);

  useEffect(() => {
    const pageNum = Number(search.split("=")[1]);
    setPage(pageNum);
  }, [search]);

  const getUser = async () => {
    try {
      const response = await fetchUserByPageNumber(page);
      for (let i = 0; i < response.data.length; i++) {
        await fetchAccountsByUserId(response.data[i].id)
          .then((res) => {
            response.data[i].account_count = res.data.length;
          })
          .catch((err) => {
            console.error(err);
          });
      }
      for (let i = 0; i < response.data.length; i++) {
        await fetchUserByUuid(response.data[i].uuid)
          .then((res) => {
            if (response.data[i].allow_marketing_push) {
              response.data[i].allow_marketing_push =
                res.data[0].allow_marketing_push;
            } else {
              response.data[i].allow_marketing_push = undefined;
            }
            if (response.data[i].is_active) {
              response.data[i].is_active = res.data[0].is_active;
            } else {
              response.data[i].is_active = undefined;
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
      setUser(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
  }, [page]);

  return {
    totalCount,
    user,
  };
};

export default useUser;
