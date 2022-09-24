import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store";
import { getRefinedAccountsInfoThunk } from "../store/account-list.reducer";

import AccountsTable from "../components/AccountsTable";
import PaginationComponent from "../components/PaginationComponent";
import SearchInput from "../components/SearchInput";

const AccountListPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { page } = useParams();

  const { accountList, accountCount, isError, isLoading } = useAppSelector(
    (state) => state.accountList
  );

  const accounts = accountList.map((account) => ({
    ...account,
    key: account.uuid,
  }));

  useEffect(() => {
    const pageNumber = page ? parseInt(page) : 1;
    dispatch(getRefinedAccountsInfoThunk({ pageNumber }));
  }, []);

  useEffect(() => {
    if (page) {
      dispatch(getRefinedAccountsInfoThunk({ pageNumber: parseInt(page) }));
    }
  }, [page]);

  const onPageClick = async (pageNumber: number) => {
    navigate(`/account-list/${pageNumber}`);
  };

  if (isError) {
    return (
      <div>Oops, something went wrong... probably access token's expired</div>
    );
  }

  return (
    <>
      <AccountsTable data={accounts} isLoading={isLoading} />
      <PaginationComponent total={accountCount} onPageClick={onPageClick} />
    </>
  );
};

export default AccountListPage;
