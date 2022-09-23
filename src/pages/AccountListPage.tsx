import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { getRefinedAccountsInfoThunk } from "../store/account-list.reducer";

import AccountsTable from "../components/AccountsTable";
import PaginationComponent from "../components/PaginationComponent";
import SearchInput from "../components/SearchInput";

const AccountListPage = () => {
  const dispatch = useAppDispatch();

  const { accountList, accountCount, isError, isLoading } = useAppSelector(
    (state) => state.accountList
  );

  const accounts = accountList.map((account) => ({
    ...account,
    key: account.uuid,
  }));

  useEffect(() => {
    dispatch(getRefinedAccountsInfoThunk({ pageNumber: 1 }));
  }, []);

  const onSearch = (searchWord: string) => {
    console.log(searchWord);
  };

  const onPageClick = async (pageNumber: number) => {
    dispatch(getRefinedAccountsInfoThunk({ pageNumber }));
  };

  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          <SearchInput onSearch={onSearch} />
          <AccountsTable data={accounts} />
        </>
      )}
      <PaginationComponent total={accountCount} onPageClick={onPageClick} />
    </>
  );
};

export default AccountListPage;
