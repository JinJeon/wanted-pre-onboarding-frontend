import { apiAddress } from "@constants/api";
import { ACCESS_TOKEN } from "@constants/words";
import { useFetch } from "@utils/api";
import { checkError } from "@utils/api";
import { getLocalStorageInfo, setLocalStorageInfo } from "@utils/localStorage";

export type SignOptionType = keyof typeof apiAddress["auth"];

type SingParamsType = {
  signOption: SignOptionType;
  email: string;
  password: string;
};

type SignSuccessDataType = { [ACCESS_TOKEN]: string };

type FetchResultType<T> = {
  isSuccess: boolean;
  data?: T;
  errorMessage?: string;
};

export const sign = async ({ email, password, signOption }: SingParamsType) => {
  const address = apiAddress.auth[signOption];
  const client = useFetch({ address, isContentType: true });
  const result: FetchResultType<SignSuccessDataType> = { isSuccess: true };

  try {
    const { data } = await client.post<SignSuccessDataType>("", { email, password });
    const accessToken = data[ACCESS_TOKEN];
    setLocalStorageInfo({ key: ACCESS_TOKEN, info: accessToken });
    result.data = data;
  } catch (error) {
    result.isSuccess = false;
    result.errorMessage = checkError(error);
  }

  return result;
};

export const checkIsLogin = () => {
  const accessToken = getLocalStorageInfo({ key: ACCESS_TOKEN });
  // 토큰을 통한 추가적인 확인을 위한 api 요청 필요
  const result = !!accessToken;
  return result;
};
