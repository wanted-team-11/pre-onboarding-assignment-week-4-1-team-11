export {};
// const fetchSearchAccountList = async ({ query, pageNumber }: Props) => {
//   const accessToken = tokenStorage.get(StorageKey.ACCESS_TOKEN);

//   if (!accessToken) throw Error("no token");

//   const instance = axios.create({
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });

//   const { data: accountList, headers } = await instance.get<
//     FetchAccountProps[]
//   >(FETCH_URL.ACCOUNTS({ query, pageNumber }));

//   return { accountList, totalCount: headers["x-total-count"] };
// };
