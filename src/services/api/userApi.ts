import { baseInstance } from "./instance";

const fetchUser = async () => {
  return baseInstance.get("/users");
};

const fetchUserByPageNumber = async (pageNum: number) => {
  return baseInstance.get(`/users?_page=${pageNum}&_limit=10`);
};

const fetchUserByUuid = async (uuid: string) => {
  return baseInstance.get(`/userSetting?uuid=${uuid}`);
};

export { fetchUser, fetchUserByPageNumber, fetchUserByUuid };
