import {
  FetchUserSettingProps,
  FetchUsersProps,
} from "../services/models/user";

export type UserListProps = Pick<
  FetchUsersProps,
  | "id"
  | "name"
  | "email"
  | "gender_origin"
  | "birth_date"
  | "phone_number"
  | "last_login"
  | "created_at"
> &
  Pick<
    FetchUserSettingProps,
    "allow_marketing_push" | "is_active" | "is_staff"
  > & { account_count: number };

export type UserDetailProps = UserListProps &
  Pick<FetchUsersProps, "photo" | "age" | "address" | "detail_address">;
