import { Descriptions } from "antd";
import { RefinedUserInfo } from "../types";

interface UserDetailDescriptionProps {
  userDetail: RefinedUserInfo | null;
}

const UserDetailDescription = ({ userDetail }: UserDetailDescriptionProps) => {
  return (
    <Descriptions
      bordered
      column={2}
      contentStyle={{ backgroundColor: "hsl(216,20%,97%)" }}
    >
      <Descriptions.Item label="나이">{userDetail?.age}</Descriptions.Item>

      <Descriptions.Item label="성별">
        {userDetail?.gender_origin}
      </Descriptions.Item>

      <Descriptions.Item label="생년월일">
        {userDetail &&
          new Intl.DateTimeFormat("ko-KR", {}).format(
            new Date(userDetail?.birth_date)
          )}
      </Descriptions.Item>

      <Descriptions.Item label="전화번호">
        {userDetail?.phone_number}
      </Descriptions.Item>

      <Descriptions.Item label="주소">{userDetail?.address}</Descriptions.Item>

      <Descriptions.Item label="주소 상세">
        {userDetail?.detail_address}
      </Descriptions.Item>

      <Descriptions.Item label="최근 로그인">
        {userDetail &&
          new Intl.DateTimeFormat("ko-KR", {
            dateStyle: "medium",
            timeStyle: "medium",
          }).format(new Date(userDetail?.last_login))}
      </Descriptions.Item>

      <Descriptions.Item label="계정 생성일">
        {userDetail &&
          new Intl.DateTimeFormat("ko-KR", {
            dateStyle: "medium",
            timeStyle: "medium",
          }).format(new Date(userDetail?.created_at))}
      </Descriptions.Item>

      <Descriptions.Item label="계정 수정일">
        {userDetail &&
          new Intl.DateTimeFormat("ko-KR", {
            dateStyle: "medium",
            timeStyle: "medium",
          }).format(new Date(userDetail?.updated_at))}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default UserDetailDescription;
