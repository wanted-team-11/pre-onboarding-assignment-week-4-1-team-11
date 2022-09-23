import { Avatar, Card, List, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useUserDetailQuery } from "../../../services/hooks/useUserDetailQuery";
import { FetchUsersProps } from "../../../services/models/user";

const UserDetail = () => {
  const { id } = useParams();
  const { userDetail, isLoading } = useUserDetailQuery(id || "");

  const generateData = (data?: FetchUsersProps) => {
    if (data)
      return Object.entries(data)
        .filter(([key]) => key !== "id" && key !== "uuid" && key !== "photo")
        .map(([key, value]) => ({
          title: key,
          content: value,
        }));
  };

  return (
    <>
      {isLoading ? (
        <Spin />
      ) : (
        <div style={{ padding: "50px" }}>
          <Avatar size={150} src={userDetail?.photo || ""} />
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={generateData(userDetail)}
            renderItem={(item) => (
              <List.Item>
                <h3>{item.title}</h3>
                <span>{item.content}</span>
              </List.Item>
            )}
          />
        </div>
      )}{" "}
    </>
  );
};

export default UserDetail;
