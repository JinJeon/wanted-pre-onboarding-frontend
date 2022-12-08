import { ACCESS_TOKEN } from "@constants/words";
import { getParseResult, ParseGuardType } from "@utils/getParseResult";

export type LocalStorageKeyType = typeof ACCESS_TOKEN;

export const getLocalStorageInfo =
  <T>(parseGuard: ParseGuardType) =>
  ({ key }: { key: LocalStorageKeyType }) => {
    const data = window.localStorage.getItem(key);

    try {
      const info = data && getParseResult<T>(parseGuard)(data);
      if (info && info.isSuccess) return info.parsedValue;
    } catch (error) {
      console.error(error);
    }

    return null;
  };

export const setLocalStorageInfo = ({ key, info }: { key: LocalStorageKeyType; info: any }) => {
  window.localStorage.setItem(key, JSON.stringify(info));
};

export const removeLocalStorageInfo = ({ key }: { key: LocalStorageKeyType }) => {
  window.localStorage.removeItem(key);
};
