import { AxiosError } from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "./typeRedux";

export const useApi = <T>(
  api: any
): [boolean, T | null, any, (...args: any[]) => Promise<T | unknown>] => {
  const [loading, setLoading] = useState<boolean>(false);
  const [resolved, setResolved] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useAppDispatch();

  const callApi = async (...args: any[]) => {
    return new Promise(async (resolve, reject) => {
      setLoading(true);

      try {
        const data = await dispatch(api(...args));

        setResolved(data);
        resolve(data);
      } catch (err: any) {
        setErrorMessage(err?.response?.data);
        reject(err);
      }
      setLoading(false);
    });
  };
  return [loading, resolved, errorMessage, callApi];
};
