import { Account, User, RefinedAccountInfo } from "../types";
import { tokenStorage } from "../utils/storages";
import brokers from "../utils/brokers";

export const changeAccountName = async ({
  userId,
  id,
  newAccount,
}: {
  userId: number;
  id: number;
  newAccount: Account;
}) => {
  try {
    const response = await fetch(`/accounts?user_id=${userId}&id=${id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + tokenStorage.get(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAccount),
    });
    if (!response.ok) {
      throw response;
    }
    console.log({ response });
    console.log({ data: await response.json() });
    return true;
  } catch (error) {
    console.error("error from changeAccountName", error);
    return false;
  }
};

export const getRefinedAccountInfo = async (userId: number, id: number) => {
  const { account, error: accountError } = await getAccount(userId, id);

  if (accountError || account === null) {
    return { refinedAccountInfo: null, error: accountError };
  }

  const { name, error: nameError } = await getUserNameOfAccount(account);

  if (nameError || name === null) {
    return { refinedAccountInfo: null, error: nameError };
  }

  const refinedAccountInfo: RefinedAccountInfo = {
    ...account,
    user_name: name,
    broker_name: brokers[account.broker_id],
  };

  return { refinedAccountInfo, error: null };
};

export const getRefinedAccountsInfo = async (page = 1) => {
  const { accounts, error, totalCount } = await getAccounts({ page });

  if (error || accounts === null) {
    return { refinedAccounts: null, error, totalCount: null };
  }
  const refinedAccounts: RefinedAccountInfo[] = await Promise.all(
    accounts.map(async (account) => {
      const { name } = await getUserNameOfAccount(account);
      const user_name = name ?? "#error";
      return {
        ...account,
        user_name,
        broker_name: brokers[account.broker_id],
      };
    })
  );

  return { refinedAccounts, error: null, totalCount };
};

export const getUserNameOfAccount = async (account: Account) => {
  try {
    const response = await fetch(`/users/${account.user_id}`, {
      headers: { Authorization: "Bearer " + tokenStorage.get() },
    });
    if (!response.ok) {
      throw response;
    }
    const user = (await response.json()) as User;
    return { name: user.name, error: null };
  } catch (error) {
    console.error("error from getUserNameOfAccount", error);
    return { name: null, error };
  }
};

export const getAccounts = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  try {
    const response = await fetch(`/accounts?_page=${page}&_limit=${limit}`, {
      headers: {
        Authorization: "Bearer " + tokenStorage.get(),
      },
    });
    if (!response.ok) {
      throw response;
    }
    const rawTotalCount = response.headers.get("x-total-count");
    const totalCount = rawTotalCount ? parseInt(rawTotalCount) : 0;
    const accounts = (await response.json()) as Account[];
    return { accounts, error: null, totalCount };
  } catch (error) {
    console.error("error from getAccounts", error);
    return { accounts: null, error, totalCount: null };
  }
};

export const getAccount = async (userId: number, id: number) => {
  try {
    const response = await fetch(`/accounts?user_id=${userId}&id=${id}`, {
      headers: {
        Authorization: "Bearer " + tokenStorage.get(),
      },
    });

    if (!response.ok) {
      throw response;
    }

    const [account] = (await response.json()) as Account[];
    return { account, error: null };
  } catch (error) {
    console.error("error from getAccount", error);
    return { account: null, error };
  }
};
