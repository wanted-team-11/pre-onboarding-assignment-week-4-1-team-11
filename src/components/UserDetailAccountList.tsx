import { List } from "antd";
import { Account, RefinedUserInfo } from "../types";
import { accountFormatter } from "../utils/formatter";
import brokerFormat from "../utils/brokerFormat";
import brokers from "../utils/brokers";

interface UserDetailAccountListProps {
  userDetail: RefinedUserInfo | null;
}

const UserDetailAccountList = ({ userDetail }: UserDetailAccountListProps) => {
  const getDescription = (account: Account) => {
    const formatType = brokerFormat[account.broker_id];
    const formattedAccount = accountFormatter(formatType, account.number);

    const broker = brokers[account.broker_id];

    const isActive = account.is_active ? "활성" : "비활성";

    return `${formattedAccount}, ${broker}, ${isActive}`;
  };

  return (
    <>
      {userDetail?.accounts && (
        <List
          bordered
          dataSource={userDetail?.accounts}
          renderItem={(account) => (
            <List.Item>
              <List.Item.Meta
                title={<h3>{account.name}</h3>}
                description={getDescription(account)}
              />
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default UserDetailAccountList;
