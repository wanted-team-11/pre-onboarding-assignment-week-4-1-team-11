import { UsersApi } from "../api/callApi";
import AntdLayout from "../components/AntdLayout";
import { useQuery } from "react-query";
import { Descriptions } from "antd";
import styled from "styled-components";

export default function UserList() {
  const userId = Number(localStorage.getItem("userId"));

  const users_query = useQuery(["users_list"], () => UsersApi(), {
    onSuccess: (data) => {
      console.log("success", data);
    },
  });
  if (users_query.data) {
    console.log(users_query.data.data[3]);
  }
  return (
    <AntdLayout>
      <>
        {users_query.data && (
          <GapContainer>
            <div>
              <br />
              <br />
              <Descriptions bordered title="사용자 정보">
                <Descriptions.Item label="이름">
                  {users_query.data.data[0].name}
                </Descriptions.Item>
                <Descriptions.Item label="성별">
                  {
                    (users_query.data.data[0].gender_origin = 1
                      ? "여자"
                      : "남자")
                  }
                </Descriptions.Item>
                <Descriptions.Item label="생년월일">
                  {users_query.data.data[0].birth_date}
                </Descriptions.Item>
                <Descriptions.Item label="주소">
                  {users_query.data.data[0].address}
                  <br />
                  {users_query.data.data[0].detail_address}
                </Descriptions.Item>
                <Descriptions.Item label="이메일">
                  {users_query.data.data[0].email}
                </Descriptions.Item>
                <Descriptions.Item label="핸드폰">
                  {users_query.data.data[0].phone_number}
                </Descriptions.Item>
                <Descriptions.Item label="헤택 정보 수신">
                  {/* {users_query.data.data[0].birth_date} */}
                </Descriptions.Item>
                <Descriptions.Item label="가입 경로">
                  {/* {users_query.data.data[0].birth_date} */}
                </Descriptions.Item>
                <Descriptions.Item label="가입 시각">
                  {users_query.data.data[0].created_at}
                </Descriptions.Item>
              </Descriptions>
              <br />
              <br />
              <Descriptions title="증권 계좌 목록">
                <Descriptions.Item label="Product">
                  Cloud Database
                </Descriptions.Item>
                <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
                <Descriptions.Item label="time">18:00:00</Descriptions.Item>
                <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
                <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                <Descriptions.Item label="Official">$60.00</Descriptions.Item>
              </Descriptions>
            </div>
          </GapContainer>
        )}
      </>
    </AntdLayout>
  );
}

const GapContainer = styled.div`
  display: flex;
  padding: 40px;
`;
