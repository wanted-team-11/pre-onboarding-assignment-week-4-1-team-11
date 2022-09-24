import { List } from "antd";
import { useParams } from "react-router-dom";
import { useAccountDetailQuery } from "../../services/hooks/useAccountDetailQuery";
import { AccountProps } from "../../types/user";

const AccountDetailPage = () => {
  const { account_number } = useParams();
  const { accountDetail, isLoading } = useAccountDetailQuery(
    account_number || ""
  );

  const generateAccountData = (data?: AccountProps) =>
    data &&
    Object.entries(data)
      .filter(([key]) => key !== "id" && key !== "uuid")
      .map(([key, value]) => ({
        title: key,
        content: value,
      }));

  return (
    <>
      {
        <div style={{ padding: "50px" }}>
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
            dataSource={generateAccountData(accountDetail)}
            renderItem={(item) => (
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

export default AccountDetailPage;
