import { baseInstance } from "./instance";

const fetchAccounts = async () => {
  return baseInstance.get("/accounts");
};

const fetchAccountsByPageNumber = async (pageNum: number) => {
  return baseInstance.get(`/accounts?_page=${pageNum}&_limit=10`);
};

const fetchAccountsByUserId = async (userId: number) => {
  return baseInstance.get(`/accounts?user_id=${userId}`);
};

export { fetchAccounts, fetchAccountsByPageNumber, fetchAccountsByUserId };
