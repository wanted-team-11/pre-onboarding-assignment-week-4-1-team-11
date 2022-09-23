import { useEffect, useState } from "react";

const AccounstTablePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {}, []);

  return <div>AccounstTablePage</div>;
};
export default AccounstTablePage;

// - 고객명(user_name)
// - 브로커명(broker_name) : 예시) OO증권,
// - 계좌번호(number) :
// - 계좌상태(status) : 예시) 운용중,
// - 계좌명(name) : 계좌명입니다.
// - 평가금액(assets) : 예시) 123,123,123
// - 입금금액(payments) : 예시) 123,123,123
// - 계좌활성화여부(is_active) : 계좌 활성화 여부
// - 계좌개설일(created_at) :
