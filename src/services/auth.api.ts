import { LoginResponse } from "../types";
import { tokenStorage } from "../utils/storages";

/**
 * storage에 있는 accessToken을 제거한다.
 */
export const logOut = () => {
  tokenStorage.remove();
};

/**
 * email과 password를 로그인 api에 보내 access토큰을 storage에 저장한다.
 * @param options 로그인에 필요한 정보를 담고있는 객체
 * @param options.email 사용자계정의 이메일
 * @param options.password 사용자 계정의 비밀번호
 * @returns 로그인 성공여부
 */
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "content-type": "application/json" },
    });
    if (!response.ok) {
      console.error("response body: ", await response.json());
      throw response;
    }
    const data = (await response.json()) as LoginResponse;
    tokenStorage.set(data.accessToken);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
