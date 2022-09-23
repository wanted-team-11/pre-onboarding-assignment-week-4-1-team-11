export interface LoginInfo {
  email: string;
  password: string;
}

export interface ResponseLogin {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}

export interface User {
  id: number;
  uuid?: string;
  photo?: string;
  name?: string;
  email: string;
  age?: number;
  gender_origin?: number;
  birth_date?: string;
  phone_number?: string;
  address?: string;
  detail_address?: string;
  last_login?: string;
  created_at?: string;
  updated_at?: string;
  password?: string;
}

export interface UserSetting {
  id: number;
  uuid: string;
  allow_marketing_push: boolean;
  allow_invest_push: boolean;
  is_active: boolean;
  is_staff: boolean;
  created_at: string;
  updated_at: string;
}

export interface Accounts {
  id: number;
  user_id: number;
  uuid: string;
  broker_id: string;
  status: number;
  number: string;
  name: string;
  assets: string;
  payments: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserList {
  name: string | undefined;
  account_count: number | undefined;
  email: string;
  birth_date: string | undefined;
  phone_number: string | undefined;
  last_login: string | undefined;
  allow_marketing_push: boolean | undefined;
  is_active: boolean | undefined;
  created_at: string | undefined;
}
export interface AccountList {
  user_name: string | undefined;
  broker_name: string;
  number: string;
  status: number;
  name: string;
  assets: string;
  payments: string;
  is_active: boolean;
  created_at: string;
}
