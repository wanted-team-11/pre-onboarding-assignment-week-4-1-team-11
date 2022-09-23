import { Avatar, Card, Divider, List, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useUserDetailQuery } from "../../../services/hooks/useUserDetailQuery";
import { UserDetailProps } from "../../../types/user";

const UserDetail = () => {
  const { id } = useParams();
  const { userDetail, isLoading } = useUserDetailQuery(id || "");

  const generateUserData = (data?: UserDetailProps["user"]) =>
    data &&
    Object.entries(data)
      .filter(([key]) => key !== "id" && key !== "uuid" && key !== "photo")
      .map(([key, value]) => ({
        title: key,
        content: value,
      }));

  const generateAccountData = (data?: UserDetailProps["accounts"]) =>
    data &&
    data.map(
      ({
        broker_id,
        status,
        number,
        name,
        assets,
        payments,
        is_active,
        created_at,
        updated_at,
      }) => ({
        title: name,
        content: broker_id,
      })
    );

  return (
    <>
      {
        <div style={{ padding: "50px" }}>
          <Avatar size={150} src={userDetail?.user?.photo || ""} />
          <List
            loading={isLoading}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={generateUserData(userDetail?.user)}
            renderItem={(item, i) => (
              <List.Item>
                <h3>{item.title}</h3>
                <span>{item.content}</span>
              </List.Item>
            )}
          />
          <Divider />
          <List
            loading={isLoading}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={generateAccountData(userDetail?.accounts)}
            renderItem={(item, i) => (
              <List.Item>
                <h3>{item.title}</h3>
                <span>{item.content}</span>
              </List.Item>
            )}
          />
        </div>
      }
    </>
  );
};

export default UserDetail;
