import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { getUserDetail } from '../../../api';
import storage from '../../../storage/index';
import { IUser, IData } from '../types/content.type';
import { getAllUserSettingData, getAllAccountsData } from '../../../api/index';

const UserDetail = () => {
  const location = useLocation();
  const [userDetail, setUserDetail] = useState<IUser>({
    id: 0,
    uuid: '',
    photo: '',
    name: '',
    email: '',
    age: 0,
    gender_origin: 0,
    birth_date: '',
    phone_number: '',
    address: '',
    detail_address: '',
    last_login: '',
    created_at: '',
    updated_at: '',
  });
  const [userSettings, setUserSettings] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const mergint: IData[] = [];

  userSettings.forEach((el: IData) => {
    if (userDetail.uuid === el.uuid) {
      const result = { ...userDetail, ...el };
      return mergint.push(result);
    }
  });

  const mergedDetail = mergint[0];

  const token = storage.get('accessToken');

  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    return () => {
      getAllUserSettingData(`${token}`).then((data) => setUserSettings(data));
      getAllAccountsData(`${token}`).then((data) => setAccounts(data));
      getUserDetail(`${token}`, `${query.q}`).then((data) =>
        setUserDetail({ ...userDetail, ...data[0] }),
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserDetailWrapper>
      <ContentTitle>{mergedDetail?.name} 님의 정보</ContentTitle>
      <DetailContainer>
        <PhotoBox>
          <Photo src={mergedDetail?.photo} alt="photo" />
        </PhotoBox>
        <InfoTable>
          <InfoContainer>성명</InfoContainer>
          <InfoContainer>{mergedDetail?.name}</InfoContainer>
          <InfoContainer>생년월일 / 성별</InfoContainer>
          <InfoContainer>
            {new Date(mergedDetail?.birth_date).toLocaleDateString()} /{' '}
            {mergedDetail?.gender_origin === 1 ||
            mergedDetail?.gender_origin === 3
              ? '남'
              : mergedDetail?.gender_origin === 2 ||
                mergedDetail?.gender_origin === 4
              ? '여'
              : null}
          </InfoContainer>
          <InfoContainer>주소</InfoContainer>
          <InfoContainer>{mergedDetail?.address}</InfoContainer>
          <InfoContainer>세부 주소</InfoContainer>
          <InfoContainer>{mergedDetail?.detail_address}</InfoContainer>
          <InfoContainer>이메일</InfoContainer>
          <InfoContainer>{mergedDetail?.email}</InfoContainer>
          <InfoContainer>핸드폰 번호</InfoContainer>
          <InfoContainer>{mergedDetail?.phone_number}</InfoContainer>
          <InfoContainer>계정 생성일</InfoContainer>
          <InfoContainer>
            {new Date(mergedDetail?.created_at).toLocaleDateString()}
          </InfoContainer>
          <InfoContainer>이벤트 수신 동의</InfoContainer>
          <InfoContainer>
            {mergedDetail?.allow_marketing_push ? 'O' : 'X'}
          </InfoContainer>
          <InfoContainer>변동 수신 동의</InfoContainer>
          <InfoContainer>
            {mergedDetail?.allow_invest_push ? 'O' : 'X'}
          </InfoContainer>
          <InfoContainer>활성화 여부</InfoContainer>
          <InfoContainer>{mergedDetail?.is_active ? 'O' : 'X'}</InfoContainer>
          <InfoContainer>Staff 여부</InfoContainer>
          <InfoContainer>{mergedDetail?.is_staff ? 'O' : 'X'}</InfoContainer>
        </InfoTable>
      </DetailContainer>
    </UserDetailWrapper>
  );
};

export default UserDetail;

const UserDetailWrapper = styled.div``;

const ContentTitle = styled.div``;

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PhotoBox = styled.div`
  width: 200px;
  height: auto;
`;

const Photo = styled.img`
  width: inherit;
  height: inherit;
`;

const InfoTable = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(4, 1fr);

  word-break: break-all;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 16px;

  width: 150px;
  height: 80px;
  padding: 10px;
  &:nth-child(odd) {
    background-color: rgba(70, 142, 247, 0.3);
    border: 2px solid rgba(70, 142, 247, 0.3);
  }
  &:nth-child(even) {
    background-color: white;
  }
`;
