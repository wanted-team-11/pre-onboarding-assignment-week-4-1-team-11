export interface IUser {
  id: number;
  uuid: string;
  photo: string;
  name: string;
  email: string;
  age: number;
  gender_origin: number;
  birth_date: string;
  phone_number: string;
  address: string;
  detail_address: string;
  last_login: string;
  created_at: string;
  updated_at: string;
}

export interface IData {
  address: string;
  allow_invest_push: boolean;
  allow_marketing_push: boolean;
  is_active: boolean;
  is_staff: boolean;
  account_count: number;
  age: number;
  birth_date: string;
  created_at: string;
  detail_address: string;
  email: string;
  gender_origin: number;
  id: number;
  last_login: string;
  name: string;
  phone_number: string;
  photo: string;
  updated_at: string;
  uuid: string;
}

export interface IColumn {
  id: number;
  title: string;
}

export interface AccountData {
  assets: string;
  broker_id: keyof Broker;
  created_at: string;
  id: number;
  is_active: boolean;
  name: string;
  number: string;
  payments: string;
  status: number;
  updated_at: string;
  user_id: string;
  uuid: string;
}

export interface Broker {
  '209': string;
  '218': string;
  '230': string;
  '238': string;
  '240': string;
  '243': string;
  '247': string;
  '261': string;
  '262': string;
  '263': string;
  '264': string;
  '265': string;
  '266': string;
  '267': string;
  '268': string;
  '269': string;
  '270': string;
  '279': string;
  '280': string;
  '288': string;
  '287': string;
  '290': string;
  '291': string;
  '292': string;
  '271': string;
}
