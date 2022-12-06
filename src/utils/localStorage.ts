import { ACCESS_TOKEN } from "@constants/words";

export type LocalStorageKeyType = typeof ACCESS_TOKEN;

export const getLocalStorageInfo = (key: LocalStorageKeyType) => {
  const data = window.localStorage.getItem(key);

  try {
    const info = data && JSON.parse(data);
    return info;
  } catch (error) {
    return error;
  }
};

export const setLocalStorageInfo = ({ key, info }: { key: LocalStorageKeyType; info: any }) => {
  window.localStorage.setItem(key, JSON.stringify(info));
};

export const removeLocalStorageInfo = ({ key }: { key: LocalStorageKeyType }) => {
  window.localStorage.removeItem(key);
};
