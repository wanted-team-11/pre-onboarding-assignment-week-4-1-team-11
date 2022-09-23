import { tokenStorage } from "../utils/storages";
import { RefinedUserInfo, Account, UserSetting } from "../types";

export const getRefinedUserInfo = async ({
  pageNumber,
  limit,
  userName,
}: {
  pageNumber?: number;
  limit?: number;
  userName?: string;
}) => {
  const { users, error, totalCount } = await getUsers(
    pageNumber,
    limit,
    userName
  );

  if (error || users === null) {
    return { refinedUserInfo: null, error, totalCount: null };
  }

  const [accounts, settings] = await Promise.all([
    getAccountsOfUsers(users),
    getSettingsOfUsers(users),
  ]);

  const refinedUserInfo: RefinedUserInfo[] = users.map((user) => ({
    ...user,
    accounts: accounts[user.id],
    account_count: accounts[user.id]?.length,
    allow_marketing_push: settings[user.uuid]?.allow_marketing_push,
    is_active: settings[user.uuid]?.is_active,
  }));

  return { refinedUserInfo, error: null, totalCount };
};

export const getSettingsOfUsers = async (users: RefinedUserInfo[]) => {
  const settingList = await Promise.allSettled(
    users.map(async (user) => {
      const userSetting = await getSettingOfUser(user.uuid);
      return {
        userSetting,
        uuid: user.uuid,
      };
    })
  );

  const settings: { [uuid: string]: UserSetting | null } = {};

  settingList.forEach((setting) => {
    switch (setting.status) {
      case "fulfilled": {
        const uuid = setting.value.uuid;
        settings[uuid] = setting.value.userSetting;
        break;
      }
      case "rejected": {
        const uuid = setting.reason.uuid;
        settings[uuid] = null;
        break;
      }
    }
  });

  return settings;
};

export const getSettingOfUser = async (uuid: string) => {
  try {
    const response = await fetch(`/userSetting?uuid=${uuid}`, {
      headers: { Authorization: "Bearer " + tokenStorage.get() },
    });

    if (!response.ok) {
      console.error("response body: ", await response.json());
      throw response;
    }

    const setting = (await response.json()) as UserSetting[];
    return setting[0];
  } catch (error) {
    console.error("error from getSettingOfUser", error);
    throw { error, uuid };
  }
};

export const getAccountsOfUsers = async (users: RefinedUserInfo[]) => {
  const accoutsLists = await Promise.allSettled(
    users.map(async (user) => {
      const userAccounts = await getAccountsOfUser(user.id);
      return {
        userAccounts,
        user_id: user.id,
      };
    })
  );

  const accounts: { [userId: number]: Account[] | null } = {};

  accoutsLists.forEach((accountList) => {
    switch (accountList.status) {
      case "fulfilled": {
        const userId = accountList.value.user_id;
        accounts[userId] = accountList.value.userAccounts;
        break;
      }
      case "rejected": {
        const userId = accountList.reason.userId;
        accounts[userId] = null;
        break;
      }
    }
  });

  return accounts;
};

export const getAccountsOfUser = async (userId: number) => {
  try {
    const response = await fetch(`/accounts?user_id=${userId}`, {
      headers: {
        Authorization: "Bearer " + tokenStorage.get(),
      },
    });
    if (!response.ok) {
      console.error("response body: ", await response.json());
      throw response;
    }
    const accounts = (await response.json()) as Account[];
    return accounts;
  } catch (error) {
    console.error("error from getAccountsOfUser", error);
    throw { error, userId };
  }
};

export const getUserTotalCount = async (userName?: string) => {
  const { totalCount } = await getUsers(1, 10, userName);
  return totalCount;
};

/**
 * 서버로부터 user 리스트를 요청해 받은 값을 리턴한다.
 * @param page 페이지번호 default 1
 * @param limit 페이지당 아이템 개수 default 10
 * @returns users, error
 * - users: 요청 성공시 받은 user 리스트. 실패시 null
 * - error: 요청 성공시 null. 실패시 발생한 에러
 */
export const getUsers: (
  page?: number,
  limit?: number,
  userName?: string
) => Promise<
  | { users: RefinedUserInfo[]; error: null; totalCount: number }
  | { users: null; error: unknown; totalCount: null }
> = async (page = 1, limit = 10, userName) => {
  try {
    const response = await fetch(
      `/users?_page=${page}&_limit=${limit}${
        userName ? `&name=${userName}` : ""
      }`,
      {
        headers: {
          Authorization: "Bearer " + tokenStorage.get(),
        },
      }
    );
    if (!response.ok) {
      console.error("response body: ", await response.json());
      throw response;
    }
    const rawTotalCount = response.headers.get("x-total-count");
    const totalCount = rawTotalCount ? parseInt(rawTotalCount) : 0;
    const users = (await response.json()) as RefinedUserInfo[];
    return { users, error: null, totalCount };
  } catch (error) {
    console.error("error from getUsers", error);
    return { users: null, error, totalCount: null };
  }
};
