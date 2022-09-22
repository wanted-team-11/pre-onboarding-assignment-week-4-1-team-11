import { tokenStorage } from "../utils/storages";
import {
  LoginResponse,
  UserWithMoreInfo,
  Account,
  UserSetting,
} from "../types";

export const getIsUserStaff = async (uuid: string) => {
  try {
    const response = await fetch(`/userSetting?uuid=${uuid}`);
    if (!response.ok) {
      throw response;
    }

    const data = (await response.json()) as UserSetting;
    return { is_staff: data.is_staff };
  } catch (error) {}
};

export const getUsersWithMoreInfo = async (pageNumber: number = 1) => {
  const { users, error } = await getUsers(pageNumber);

  if (users === null) {
    return { usersWithMoreInfo: null, error };
  }

  const accounts = await getAccountsOfUsers(users);
  const settings = await getSettingsOfUsers(users);

  const usersWithMoreInfo: UserWithMoreInfo[] = users.map((user) => ({
    ...user,
    accounts: accounts[user.id],
    account_count: accounts[user.id]?.length,
    allow_marketing_push: settings[user.uuid]?.allow_marketing_push,
    is_active: settings[user.uuid]?.is_active,
  }));

  return { usersWithMoreInfo, error: null };
};

export const getSettingsOfUsers = async (users: UserWithMoreInfo[]) => {
  const settingList = await Promise.allSettled(
    users.map((user) => getSettingOfUser(user.uuid))
  );

  const settings: { [uuid: string]: UserSetting | null } = {};

  settingList.forEach((setting) => {
    switch (setting.status) {
      case "fulfilled": {
        const uuid = setting.value.uuid;
        settings[uuid] = setting.value;
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
      throw response;
    }

    const setting = (await response.json()) as UserSetting[];
    return setting[0];
  } catch (error) {
    console.error("error from getSettingOfUser", error);
    throw { error, uuid };
  }
};

export const getAccountsOfUsers = async (users: UserWithMoreInfo[]) => {
  const accoutsLists = await Promise.allSettled(
    users.map((user) => getAccountsOfUser(user.id))
  );

  const accounts: { [userId: number]: Account[] | null } = {};

  accoutsLists.forEach((accountList) => {
    switch (accountList.status) {
      case "fulfilled": {
        const userId = accountList.value[0].user_id;

        accountList.value.forEach((account) => {
          if (!accounts[userId]) {
            accounts[userId] = [];
          }
          accounts[userId]?.push(account);
        });
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
      throw response;
    }
    const accounts = (await response.json()) as Account[];
    return accounts;
  } catch (error) {
    console.error("error from getAccountsOfUser", error);
    throw { error, userId };
  }
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
  page: number,
  limit?: number
) => Promise<
  { users: UserWithMoreInfo[]; error: null } | { users: null; error: unknown }
> = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`/users?_page=${page}&_limit=${limit}`, {
      headers: {
        Authorization: "Bearer " + tokenStorage.get(),
      },
    });
    if (!response.ok) {
      throw response;
    }
    const users = (await response.json()) as UserWithMoreInfo[];
    return { users, error: null };
  } catch (error) {
    console.error("error from getUsers", error);
    return { users: null, error };
  }
};

/**
 * storage에 있는 accessToken을 제거한다.
 */
export const logOut = () => {
  tokenStorage.remove();
};

/**
 * email과 password를 로그인 api에 보내 access토큰을 storage에 저장한다.
 * @param options 로그인에 필요한 정보를 담고있는 객체
 * @param options.email 사용자계정의 이메일
 * @param options.password 사용자 계정의 비밀번호
 * @returns 로그인 성공여부
 */
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "content-type": "application/json" },
    });
    if (!response.ok) {
      throw response;
    }
    const data = (await response.json()) as LoginResponse;
    tokenStorage.set(data.accessToken);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
