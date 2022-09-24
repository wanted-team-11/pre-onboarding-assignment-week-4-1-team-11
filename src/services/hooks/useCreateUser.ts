import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "antd";
import { fetchSignup } from "../api/fetchAuth";
import { QUERY_KEY } from "../models/queryKeys";

const useCreateQuery = (successCallback: () => void) => {
  const queryClient = useQueryClient();

  const createUserQuery = useMutation(fetchSignup, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.GET_USER_LIST]);
      successCallback();
    },
    onError: (err) => {
      Modal.error({
        title: "error",
        content: `${err}`,
      });
    },
  }).mutate;
  return {
    createUserQuery,
  };
};

export { useCreateQuery };
