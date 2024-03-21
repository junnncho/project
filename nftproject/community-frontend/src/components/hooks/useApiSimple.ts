import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useDispatch } from "react-redux";

export const useApiSimple = (
  api: any,
  setInitLoadingValue: boolean = false
) => {
  const [loading, setLoading] = useState<boolean>(setInitLoadingValue);
  const dispatch = useDispatch();

  const callApi = async (...args: any[]): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      setLoading(true);
      try {
        const data = await dispatch(api(...args));
        resolve(data);
      } catch (error) {
        reject(error);
      }
      setLoading(false);
    });
  };
  return [loading, callApi];
};
