export const onLogin = async (email: string, password: string) => {
  const res = await fetch('/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await res.json();
  return data.accessToken;
};

export const getUsersData = async (token: string) => {
  const res = await fetch(`/users?_page=$1&_limit=10`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = res.json();
  return data;
};

export const getUserDetail = async (token: string, name: string) => {
  const res = await fetch(`/users?q=${name}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = res.json();
  return data;
};

export const getAllUserSettingData = async (token: string) => {
  const res = await fetch('/userSetting', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = res.json();
  return data;
};

export const getAccountsData = async (token: string) => {
  const res = await fetch(`/accounts?_page=$1&_limit=10'`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = res.json();
  return data;
};

export const getAllAccountsData = async (token: string) => {
  const res = await fetch('/accounts', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = res.json();
  return data;
};

export const getNextData = async (
  token: string,
  page: string,
  pageNum: number,
) => {
  const res = await fetch(`/${page}?_page=${pageNum}&_limit=10`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = res.json();
  return data;
};
