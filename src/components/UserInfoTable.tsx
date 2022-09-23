import styled from "styled-components";
import { Descriptions } from "antd";
import { UseQueryResult } from "react-query";
import { AxiosResponse } from "axios";

export default function UserInfoTable({
  users_query,
  userSetting_query,
}: //   countAccount_query,
{
  users_query: UseQueryResult<AxiosResponse<any, any>, any>;
  userSetting_query: UseQueryResult<AxiosResponse<any, any>, any>;
  //   countAccount_query: UseMutationResult<
  //     AxiosResponse<any, any>,
  //     unknown,
  //     number,
  //     unknown
  //   >;
}) {
  const userId = Number(localStorage.getItem("userId"));

  const maskingName = function (strName: string) {
    if (strName.length > 2) {
      const originName = strName.split("");
      originName.forEach(function (name, i) {
        if (i === 0 || i === originName.length - 1) return;
        originName[i] = "*";
      });
      const joinName = originName.join();
      return joinName.replace(/,/g, "");
    } else {
      const pattern = /.$/;
      return strName.replace(pattern, "*");
    }
  };

  const maskingPhone = (phone: string) => {
    return (
      phone.substring(0, 3) +
      "****" +
      phone.substring(phone.length - 4, phone.length)
    );
  };

  const organizeDay = (data: string) => {
    return data.substring(0, 10);
  };

  const organizeTime = (data: string) => {
    return data.substring(0, 10) + " " + data.substring(11, 16);
  };

  return (
    <>
      <GapContainer>
        {users_query.data && userSetting_query.data && (
          <div>
            <br />
            <br />
            <Descriptions bordered title="사용자 정보">
              <Descriptions.Item label="이름">
                <a href="user_detail">
                  {maskingName(users_query.data.data[0].name)}
                </a>
              </Descriptions.Item>

              <Descriptions.Item label="성별">
                {users_query.data.data[0].gender_origin === 1
                  ? "남자"
                  : users_query.data.data[0].gender_origin === 2
                  ? "여자"
                  : null}
              </Descriptions.Item>
              <Descriptions.Item label="생년월일">
                {organizeDay(users_query.data.data[0].birth_date)}
              </Descriptions.Item>
              <Descriptions.Item label="보유중인 계좌 수">
                {users_query.data.data[0].account_count}
              </Descriptions.Item>
              <Descriptions.Item label="이메일">
                {users_query.data.data[0].email}
              </Descriptions.Item>
              <Descriptions.Item label="핸드폰">
                {maskingPhone(users_query.data.data[0].phone_number)}
              </Descriptions.Item>
              <Descriptions.Item label="헤택 정보 수신">
                {userSetting_query.data.data[0].allow_marketing_push === true
                  ? "O"
                  : userSetting_query.data.data[0].allow_marketing_push ===
                    false
                  ? "X"
                  : null}
              </Descriptions.Item>
              <Descriptions.Item label="활성화 여부">
                {userSetting_query.data.data[0].is_active === true
                  ? "O"
                  : userSetting_query.data.data[0].is_active === false
                  ? "X"
                  : null}
              </Descriptions.Item>
              <Descriptions.Item label="가입 시각">
                {organizeTime(users_query.data.data[0].created_at)}
              </Descriptions.Item>
              <Descriptions.Item label="최근 로그인">
                {organizeTime(users_query.data.data[0].last_login)}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </GapContainer>
    </>
  );
}
const GapContainer = styled.div`
  display: flex;
  padding: 40px;
`;
