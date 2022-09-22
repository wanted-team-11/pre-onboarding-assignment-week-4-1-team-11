import { baseInstance } from "./instance";

const fetchAccountsByUserId = async (userId: number) => {
  return baseInstance.get(`/accounts?user_id=${userId}`);
};

export { fetchAccountsByUserId };
