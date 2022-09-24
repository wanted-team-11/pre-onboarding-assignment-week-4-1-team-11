export interface User {
  map(arg0: (data: any) => any): unknown;
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

export interface Accounts {
  filter(arg0: (account: { user_id: any }) => boolean): unknown;
  id: number;
  user_id: number;
  uuid: string;
  broker_id: string;
  status: number;
  number: string;
  name: string;
  assets: string;
  payments: string;
  is_active: false;
  created_at: string;
  updated_at: string;
}
export interface UserSetting {
  find(arg0: (setting: { uuid: any }) => boolean): any;
  id: number;
  uuid: string;
  allow_marketing_push: boolean;
  allow_invest_push: boolean;
  is_active: boolean;
  is_staff: boolean;
  created_at: string;
  updated_at: string;
}

export interface FilteredUser extends User {
  key: string;
  account_count: number;
  allow_marketing_push: boolean;
  is_active: boolean;
}

export interface Columns {
  title: string;
  dataIndex: string;
  width: string;
  key: string;
  editable?: boolean;
  render?: (_: any, record: FilteredUser) => JSX.Element;
}

export type AccountProps = {
  id: number;
  uuid: string;
  user_id: number;
  user_name: string;
  broker_name: string;
  number: string;
  name: string;
  assets: string;
  payments: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
