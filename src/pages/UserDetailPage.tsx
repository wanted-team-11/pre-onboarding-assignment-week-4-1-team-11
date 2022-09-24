import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { getRefinedUserInfoThunk } from "../store/user-list.reducer";
import { Image, Card } from "antd";
import styled from "styled-components";

import UserDetailDescription from "../components/UserDetailDescription";
import UserDetailAccountList from "../components/UserDetailAccountList";

const { Meta } = Card;

const UserDetailPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const userDetail = useAppSelector((state) => state.userList.userDetail);
  useEffect(() => {
    if (!id) return;

    const userId = parseInt(id);
    dispatch(getRefinedUserInfoThunk(userId));
  }, []);

  return (
    <Wrapper>
      <HContainer>
        <Card cover={<Image src={userDetail?.photo} />}>
          <Meta title={userDetail?.name} description={userDetail?.email} />
        </Card>

        <VContainer>
          <div>
            <h3>사용자 정보</h3>
            <UserDetailDescription userDetail={userDetail} />
          </div>
          <div>
            <h3>보유 계좌 목록</h3>
            <UserDetailAccountList userDetail={userDetail} />
          </div>
        </VContainer>
      </HContainer>
    </Wrapper>
  );
};
// 이 페이지에서 써볼만한 ant ui: description(전체적인 설명 ui), image(유저 이미지), list(계좌 리스트), statistics (계좌 금액), table, tag, skeleton
// 다른 곳에서 써볼만한 ant ui: message, modal, popconfirm(정보 수정 및 삭제),

export default UserDetailPage;

const HContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 30px;
  & > *:first-child {
    width: 300px;
  }
`;

const VContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  & > div > h3 {
    margin-bottom: 10px;
    font-weight: bold;
  }
`;

const Wrapper = styled.div`
  padding: 30px;
`;
