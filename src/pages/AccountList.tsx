import React from "react";
import AntdLayout from "../components/AntdLayout";
import { useQuery } from "react-query";
import { AccountApi } from "../api/callApi";

export default function AccountList() {
  const account_query = useQuery(["account_list"], () => AccountApi(), {
    onSuccess: (data) => {
      console.log("success", data);
    },
  });
  if (account_query.data) {
    console.log(account_query.data.data);
  }
  return (
    <AntdLayout>
      <div>AccountList</div>
    </AntdLayout>
  );
}
