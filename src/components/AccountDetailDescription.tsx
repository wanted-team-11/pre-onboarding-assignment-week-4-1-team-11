import { Descriptions } from "antd";
import { RefinedAccountInfo } from "../types";
import accountStatus from "../utils/accountStatus";
import { accountFormatter } from "../utils/formatter";
import brokerFormat from "../utils/brokerFormat";

interface AccountDetailDescriptionProps {
  account: RefinedAccountInfo | null;
}

const AccountDetailDescription = ({
  account,
}: AccountDetailDescriptionProps) => {
  return (
    <Descriptions
      bordered
      column={2}
      contentStyle={{ backgroundColor: "hsl(216,20%,97%)" }}
      title="계좌 상세정보"
    >
      <Descriptions.Item label="게좌명">{account?.name}</Descriptions.Item>

      <Descriptions.Item label="소유자">{account?.user_name}</Descriptions.Item>

      <Descriptions.Item label="브로커명">
        {account?.broker_name}
      </Descriptions.Item>

      <Descriptions.Item label="계좌번호">
        {account?.number &&
          accountFormatter(brokerFormat[account?.broker_id], account?.number)}
      </Descriptions.Item>

      <Descriptions.Item label="활성여부">
        {account?.is_active ? "활성" : "비활성"}
      </Descriptions.Item>

      <Descriptions.Item label="계좌상태">
        {account?.status && accountStatus[account?.status]}
      </Descriptions.Item>

      <Descriptions.Item label="잔고">
        {account?.assets &&
          new Intl.NumberFormat().format(parseInt(account.assets))}
      </Descriptions.Item>

      <Descriptions.Item label="지불액">
        {account?.payments &&
          new Intl.NumberFormat().format(parseInt(account.payments))}
      </Descriptions.Item>

      <Descriptions.Item label="생성일자">
        {account?.created_at &&
          new Intl.DateTimeFormat("ko-KR", {
            dateStyle: "medium",
            timeStyle: "medium",
          }).format(new Date(account.created_at))}
      </Descriptions.Item>

      <Descriptions.Item label="갱신일자">
        {account?.updated_at &&
          new Intl.DateTimeFormat("ko-KR", {
            dateStyle: "medium",
            timeStyle: "medium",
          }).format(new Date(account.updated_at))}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default AccountDetailDescription;
