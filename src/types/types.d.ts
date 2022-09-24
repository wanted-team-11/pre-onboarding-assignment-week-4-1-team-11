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
  broker_id: keyof Broker;
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
  id: number;
  gender_origin: number | undefined;
  account_count: number | undefined;
  email: string;
  birth_date: string | undefined;
  phone_number: string | undefined;
  last_login: string | undefined;
  allow_marketing_push: boolean | undefined;
  address: string | undefined;
  detail_address: string | undefined;
  is_active: boolean | undefined;
  created_at: string | undefined;
}
export interface AccountList {
  user_name: string | undefined;
  user_id: number | undefined;
  broker_id: keyof Broker;
  number: string;
  status: number;
  name: string;
  assets: string;
  payments: string;
  is_active: boolean;
  created_at: string;
}

export interface Broker {
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

export interface AccountBrokerFormat {
  "209": "00-00000000-00";
  "218": "00-0000000-000";
  "230": "00-000000-0000";
  "238": "00-000-0000-000";
  "240": "00-0000-000000";
  "243": "00-000000000-0";
  "247": "00-0000-000000";
  "261": "00-00-00000000";
  "262": "00-0000000-000";
  "263": "00-0000-000000";
  "264": "00-0000-00-0000";
  "265": "00-000-000-0000";
  "266": "00-00000-00000";
  "267": "00-000-0000000";
  "268": "00-000000-00-00";
  "269": "00-00000-00000";
  "270": "00-000-0000000";
  "279": "00-00000-00000";
  "280": "00-0000-000000";
  "288": "00-00000000-00";
  "287": "00-0000-00000-0";
  "290": "00-000000-0000";
  "291": "00-0000-000000";
  "292": "00-00000-00000";
  "271": "00-000-0000000";
}
