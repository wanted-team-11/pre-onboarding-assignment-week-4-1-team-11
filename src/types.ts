export interface User {
  key: string;
  id: number;
  uuid: string;
  photo: string;
  name: string;
  email: string;
  age: number;
  gender_origin: number;
  birth_date: string;
  phone_number: string;
  last_login: string;
  address: string;
  detail_address: string;
  created_at: string;
  updated_at: string;
  account_count: number;
  allow_marketing_push: boolean;
  is_active: boolean;
}

export interface Columns {
  title: string;
  dataIndex: string;
  width: string;
  editable: boolean;
  render?: (_: any, record: User) => JSX.Element;
}

export interface InputProps {
  email: string;
  password: string;
}

export interface UserByUuid {
  id: number;
  uuid: string;
  allow_marketing_push: boolean;
  allow_invest_push: boolean;
  is_active: boolean;
  is_staff: boolean;
  created_at: string;
  updated_at: string;
}
