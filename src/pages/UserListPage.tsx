import { useState, useEffect } from "react";
import { UserWithMoreInfo } from "../types";
import { getUsersWithMoreInfo } from "../services/api";
import UsersTable from "../components/UsersTable";

const UserListPage = () => {
  const [users, setUsers] = useState<UserWithMoreInfo[]>([]);
  useEffect(() => {
    (async () => {
      const { usersWithMoreInfo, error } = await getUsersWithMoreInfo(1);
      if (error || usersWithMoreInfo === null) {
        alert("사용자 목록을 받는데 실패했습니다. 다시 시도해주세요.");
        return;
      }

      const keyedData = usersWithMoreInfo.map((info) => ({
        ...info,
        key: info.uuid,
      }));

      setUsers(keyedData);
    })();
  }, []);
  return <>{users.length && <UsersTable data={users} />}</>;
};

export default UserListPage;
