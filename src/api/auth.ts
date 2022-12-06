import { apiAddress } from "@constants/api";
import { ACCESS_TOKEN } from "@constants/words";
import { useFetch } from "@utils/api";
import { setLocalStorageInfo } from "@utils/localStorage";

import { checkError } from "./../utils/api";

type SignOptionType = keyof typeof apiAddress["auth"];

type SingParamsType = {
  signOption: SignOptionType;
  email: string;
  password: string;
};

type SignSuccessDataType = { [ACCESS_TOKEN]: string };

export const sign = async ({ email, password, signOption }: SingParamsType) => {
  const address = apiAddress.auth[signOption];
  const client = useFetch({ address, isContentType: true });

  try {
    const { data } = await client.post<SignSuccessDataType>("", { email, password });
    const accessToken = data[ACCESS_TOKEN];
    setLocalStorageInfo({ key: ACCESS_TOKEN, info: accessToken });
    return data;
  } catch (error) {
    return checkError(error);
  }
};
