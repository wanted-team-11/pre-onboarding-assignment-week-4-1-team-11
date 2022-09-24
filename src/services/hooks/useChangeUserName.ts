import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "antd";
import { fetchUpdateUser } from "../api/fetchUpdateUser";

import { QUERY_KEY } from "../models/queryKeys";

const useChangeUserName = (successCallback: () => void) => {
  const queryClient = useQueryClient();

  const reviseUserQuery = useMutation(fetchUpdateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.GET_USER_LIST]);
      Modal.success({
        title: "고객 이름 수정",
        content: "고객의 이름이 수정되었습니다.",
        onOk: () => successCallback(),
      });
    },
    onError: (err) => {
      Modal.error({
        title: "error",
        content: `${err}`,
      });
    },
  }).mutate;
  return {
    reviseUserQuery,
  };
};

export { useChangeUserName };
