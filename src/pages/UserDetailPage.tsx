import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { getRefinedUserInfoThunk } from "../store/user-list.reducer";

const UserDetailPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const userDetail = useAppSelector((state) => state.userList.userDetail);
  useEffect(() => {
    if (!id) return;

    const userId = parseInt(id);
    dispatch(getRefinedUserInfoThunk(userId));
  }, []);
  console.log({ userDetail });

  return <div>UserDetailPage</div>;
};
// 이 페이지에서 써볼만한 ant ui: description(전체적인 설명 ui), image(유저 이미지), list(계좌 리스트), statistics (계좌 금액), table, tag, skeleton
// 다른 곳에서 써볼만한 ant ui: message, modal, popconfirm(정보 수정 및 삭제),

export default UserDetailPage;
