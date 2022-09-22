export interface LoginResponse {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}

export interface User {
  id: number;
  uuid: string;
  photo: string;
  name: string;
  email: string;
  age: any;
  gender_origin: number;
  birth_date: string;
  phone_number: string;
  address: string;
  detail_address: string;
  last_login: string;
  created_at: string;
  updated_at: string;
  password?: string;
}

export interface RefinedUserInfo extends User {
  key?: string;
  accounts?: Account[] | null; // Account
  account_count?: number;
  allow_marketing_push?: boolean; // UserSetting
  is_active?: boolean; // UserSetting
}

export interface Account {
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
