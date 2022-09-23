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
  broker_id: keyof Brokers;
  status: keyof AccountStatus;
  number: string;
  name: string;
  assets: string;
  payments: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RefinedAccountInfo extends Account {
  user_name: string;
  broker_name: Brokers[keyof Brokers];
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

export interface Brokers {
  "209": "유안타증권";
  "218": "현대증권";
  "230": "미래에셋증권";
  "238": "대우증권";
  "240": "삼성증권";
  "243": "한국투자증권";
  "247": "우리투자증권";
  "261": "교보증권";
  "262": "하이투자증권";
  "263": "HMC투자증권";
  "264": "키움증권";
  "265": "이베스트투자증권";
  "266": "SK증권";
  "267": "대신증권";
  "268": "아이엠투자증권";
  "269": "한화투자증권";
  "270": "하나대투자증권";
  "279": "동부증권";
  "280": "유진투자증권";
  "288": "카카오페이증권";
  "287": "메리츠종합금융증권";
  "290": "부국증권";
  "291": "신영증권";
  "292": "LIG투자증권";
  "271": "토스증권";
}

export interface AccountStatus {
  9999: "관리자확인필요";
  1: "입금대기";
  2: "운용중";
  3: "투자중지";
  4: "해지";
}
