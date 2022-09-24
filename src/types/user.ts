import { FetchUsersProps } from "../services/models/user";

export type UserProps = {
  id: number;
  name: string;
  email: string;
  gender_origin: number;
  birth_date: string;
  phone_number: string;
  last_login: string;
  created_at: string;
  allow_marketing_push: boolean;
  is_active: boolean;
  is_staff: boolean;
  account_count: number;
};

export type UserDetailProps = { user: FetchUsersProps } & {
  accounts: {
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
  }[];
};

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
