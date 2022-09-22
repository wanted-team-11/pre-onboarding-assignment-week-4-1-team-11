import { useState, useEffect } from "react";
import { RefinedUserInfo } from "../types";
import { getUsersWithMoreInfo } from "../services/api";
import UsersTable from "../components/UsersTable";
import PaginationComponent from "../components/PaginationComponent";

const UserListPage = () => {
  const [users, setUsers] = useState<RefinedUserInfo[]>([]);

  const populateUsersData = async (pageNum: number) => {
    const { usersWithMoreInfo, error } = await getUsersWithMoreInfo(pageNum);

    if (error || usersWithMoreInfo === null) {
      alert("사용자 목록을 받는데 실패했습니다. 다시 시도해주세요.");
      return;
    }

    const keyedData = usersWithMoreInfo.map((info) => ({
      ...info,
      key: info.uuid,
    }));

    setUsers(keyedData);
  };

  useEffect(() => {
    populateUsersData(1);
  }, []);

  return (
    <>
      {users.length !== 0 && (
        <>
          <UsersTable data={users} />
          <PaginationComponent onPageClick={populateUsersData} />
        </>
      )}
    </>
  );
};

export default UserListPage;
